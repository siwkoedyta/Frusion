package com.esiwko.frusion.controller.transactions;

import com.esiwko.frusion.controller.errors.BadRequestEx;
import com.esiwko.frusion.repo.transactions.TransactionsRepo;
import com.esiwko.frusion.repo.boxes.BoxesRepo;
import com.esiwko.frusion.repo.clients.ClientsRepo;
import com.esiwko.frusion.repo.fruits.FruitsRepo;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.Collection;
import java.util.UUID;

@RestController
public class TransactionsController {
    private final TransactionsRepo transactionsRepo;
    private final BoxesRepo boxesRepo;
    private final FruitsRepo fruitsRepo;


    public TransactionsController(TransactionsRepo transactionsRepo, BoxesRepo boxesRepo, FruitsRepo fruitsRepo) {
        this.transactionsRepo = transactionsRepo;
        this.boxesRepo = boxesRepo;
        this.fruitsRepo = fruitsRepo;
    }

    @PostMapping("/transactions")
    public Json.AddTransactionResponse add(@RequestBody Json.AddTransactionRequest req) {
        var id = UUID.randomUUID().toString();
        if (req.clientId().isBlank() || req.fruitId().isBlank() || req.boxId().isBlank() || req.quantityBoxes() <= 0) {
            throw new BadRequestEx("Invalid transaction data");
        }

        var fruit = fruitsRepo.getFruitById(req.fruitId());
        var box = boxesRepo.getBoxById(req.boxId());

        if (fruit == null || box == null) {
            throw new BadRequestEx("Invalid fruit or box ID");
        }

        double boxWeight = box.weight();
        double transactionWeight = req.weight();
        int quantityBoxes = req.quantityBoxes();
        BigDecimal fruitPrice = fruit.price();

        BigDecimal boxWeightTotal = BigDecimal.valueOf(boxWeight * quantityBoxes);
        BigDecimal transactionWeightTotal = BigDecimal.valueOf(transactionWeight);
        BigDecimal difference = transactionWeightTotal.subtract(boxWeightTotal);

        BigDecimal amount = difference.multiply(fruitPrice).setScale(2, BigDecimal.ROUND_HALF_UP);

        Json.Transaction transaction = new Json.Transaction(
                id,
                req.clientId(),
                req.fruitId(),
                req.weight(),
                req.boxId(),
                req.quantityBoxes(),
                amount
        );

        transactionsRepo.addTransaction(transaction);
        return new Json.AddTransactionResponse(transaction.id());
    }

    @GetMapping("/transactions")
    public Collection<Json.Transaction> getAll() {
        return transactionsRepo.getAllTransactions();
    }
}