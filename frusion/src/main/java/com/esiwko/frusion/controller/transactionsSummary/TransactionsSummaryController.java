package com.esiwko.frusion.controller.transactionsSummary;

import com.esiwko.frusion.controller.auth.AuthDetails;
import com.esiwko.frusion.controller.auth.JwtService;
import com.esiwko.frusion.controller.errors.BadRequestEx;
import com.esiwko.frusion.repo.pg.boxes.BoxEntity;
import com.esiwko.frusion.repo.pg.boxes.BoxesPGRepo;
import com.esiwko.frusion.repo.pg.fruits.FruitEntity;
import com.esiwko.frusion.repo.pg.transactions.TransactionEntity;
import com.esiwko.frusion.repo.pg.transactions.TransactionPGRepo;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.CookieValue;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.stream.Collectors;

@RestController
@RequiredArgsConstructor
public class TransactionsSummaryController {
    private final JwtService jwtService;

    private final TransactionPGRepo transactionsRepo;
    private final BoxesPGRepo boxesRepo;

    @GetMapping("transactionsSummary")
    public List<Json.FruitSummary> getAll(@CookieValue("accessToken") String token,
                                          @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate startDate,
                                          @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE) LocalDate endDate) {
        val adminId = jwtService.verify(token, AuthDetails.Role.ADMIN);

        List<TransactionEntity> transactions = transactionsRepo.getAllTransactions(adminId, startDate, endDate);

        return transactions.stream()
                .collect(Collectors.groupingBy(t -> t.getFruit().getId()))
                .values().stream()
                .map(this::calculateFruitSummary)
                .toList();
    }


    private Json.FruitSummary calculateFruitSummary(Collection<TransactionEntity> transactions) {
        TransactionEntity firstTransaction = transactions.stream().findFirst().orElse(null);
        if (firstTransaction == null) {
            return null;
        }

        FruitEntity fruit = firstTransaction.getFruit();
        String fruitId = fruit.getId();
        String fruitName = fruit.getName();

        BigDecimal averagePrice = transactions.stream()
                .map(TransactionEntity::getPrice)
                .reduce(BigDecimal.ZERO, BigDecimal::add)
                .divide(BigDecimal.valueOf(transactions.size()), 2, BigDecimal.ROUND_HALF_UP);

        Map<String, List<TransactionEntity>> transactionsByBox = transactions.stream()
                .collect(Collectors.groupingBy(TransactionEntity::getBox_id));

        List<Json.Box> boxes = transactionsByBox.entrySet().stream()
                .map(entry -> {
                    String boxId = entry.getKey();
                    BoxEntity box = boxesRepo.findById(boxId).orElse(null);
                    if (box != null) {
                        int quantity = entry.getValue().stream()
                                .mapToInt(TransactionEntity::getNumber_of_boxes)
                                .sum();
                        return new Json.Box(boxId, box.getName(), quantity);
                    } else {
                        return null;
                    }
                })
                .filter(Objects::nonNull)
                .toList();

        double sumWeight = transactions.stream()
                .mapToDouble(TransactionEntity::getWeight_net)
                .sum();

        BigDecimal sumAmount = transactions.stream()
                .map(TransactionEntity::getAmount)
                .reduce(BigDecimal.ZERO, BigDecimal::add);

        return new Json.FruitSummary(fruitId, fruitName, averagePrice, boxes, sumWeight, sumAmount);
    }
}
