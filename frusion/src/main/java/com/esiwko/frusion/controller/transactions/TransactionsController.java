package com.esiwko.frusion.controller.transactions;
import org.springframework.format.annotation.DateTimeFormat;
import com.esiwko.frusion.controller.errors.BadRequestEx;
import com.esiwko.frusion.repo.pg.admins.AdminEntity;
import com.esiwko.frusion.repo.pg.boxes.BoxEntity;
import com.esiwko.frusion.repo.pg.boxes.BoxesPGRepo;
import com.esiwko.frusion.repo.pg.fruits.FruitEntity;
import com.esiwko.frusion.repo.pg.fruits.FruitsPGRepo;
import com.esiwko.frusion.repo.pg.transactions.TransactionEntity;
import com.esiwko.frusion.repo.pg.transactions.TransactionPGRepo;
import com.esiwko.frusion.repo.pg.users.UserEntity;
import com.esiwko.frusion.repo.pg.users.UsersPGRepo;
import lombok.RequiredArgsConstructor;
import lombok.val;
import org.springframework.data.crossstore.ChangeSetPersister;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.Date;
import java.math.BigDecimal;
import java.util.Collection;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequiredArgsConstructor

public class TransactionsController {
    private final TransactionPGRepo transactionsRepo;
    private final FruitsPGRepo fruitsRepo;
    private final BoxesPGRepo boxesRepo;
    private final UsersPGRepo usersRepo;

    @PostMapping("/transactions")
    public Json.AddTransactionResponse add(@CookieValue("adminId") String adminId, @RequestBody Json.AddTransactionRequest req) {
        var id = UUID.randomUUID().toString();

        FruitEntity fruit = fruitsRepo.findById(req.fruitId()).orElseThrow(() -> new BadRequestEx("FRUIT_ILLEGAL"));
        BoxEntity box = boxesRepo.findById(req.boxId()).orElseThrow(() -> new BadRequestEx("BOX_ILLEGAL"));
        UserEntity user = usersRepo.findById(req.userId()).orElseThrow(() -> new BadRequestEx("USER_ILLEGAL"));

        if (fruit == null || box == null) {
            throw new BadRequestEx("Invalid fruit or box ID");
        }

        val admin = new AdminEntity();
        admin.setId(adminId);

        LocalDate today = LocalDate.now();

        double boxWeight = box.getWeight();
        double weightGross = req.weightGross();
        int numberOfBoxes = req.numberOfBoxes();
        BigDecimal price = fruit.getPrice();

        BigDecimal boxWeightTotal = BigDecimal.valueOf(boxWeight * numberOfBoxes);
        BigDecimal weightGrossBigDecimal = BigDecimal.valueOf(weightGross);
        BigDecimal weightNet = weightGrossBigDecimal.subtract(boxWeightTotal);

        BigDecimal amount = weightNet.multiply(price).setScale(2, BigDecimal.ROUND_HALF_UP);

        transactionsRepo.save(new TransactionEntity(
                id,
                user,
                admin,
                req.weightGross(),
                box.getId(),
                req.numberOfBoxes(),
                today,
                weightNet.doubleValue(),
                amount,
                price,
                fruit
        ));

        return new Json.AddTransactionResponse(id);
    }

    @GetMapping("transactions")
    public Collection<Json.Transaction> getAll(@CookieValue("adminId") String adminId) {
        return transactionsRepo.findAllByAdminId(adminId)
                .stream().map(t -> new Json.Transaction(
                        t.getId(),
                        t.getWeight_gross(),
                        t.getBox_id(),
                        t.getNumber_of_boxes(),
                        t.getTransaction_date(),
                        t.getWeight_net(),
                        t.getAmount(),
                        t.getPrice(),
                        t.getFruit().getId()
                )).toList();
    }


}