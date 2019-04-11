import { blockchain } from "../../../../mocks/blockchain";
import "../../../../mocks/core-container";
import { database } from "../../../../mocks/database";

import { Transactions } from "@arkecosystem/crypto";
import {
    getUnconfirmedTransactions,
    verifyTransaction,
} from "../../../../../../../packages/core-p2p/src/socket-server/versions/internal";
import { genesisBlock } from "../../../../../../utils/config/unitnet/genesisBlock";

jest.mock("../../../../../../../packages/core-p2p/src/socket-server/utils/validate");

describe("Internal handlers - transactions", () => {
    describe("verifyTransaction", () => {
        it("should return 'valid' object when transaction is valid", async () => {
            database.verifyTransaction = jest.fn().mockReturnValue(true);
            const req = {
                data: {
                    transaction: Transactions.Transaction.toBytes(genesisBlock.transactions[0]),
                },
            };
            const result = await verifyTransaction({ req });
            expect(result).toEqual({
                data: {
                    valid: true,
                },
            });
        });

        it("should return 'invalid' object when transaction is invalid", async () => {
            database.verifyTransaction = jest.fn().mockReturnValue(false);
            const req = {
                data: {
                    transaction: Transactions.Transaction.toBytes(genesisBlock.transactions[0]),
                },
            };
            const result = await verifyTransaction({ req });
            expect(result).toEqual({
                data: {
                    valid: false,
                },
            });
        });
    });

    describe("getUnconfirmedTransactions", () => {
        it("should return unconfirmed transactions", () => {
            blockchain.getUnconfirmedTransactions = jest.fn().mockReturnValue(["111"]);
            const result = getUnconfirmedTransactions();
            expect(result).toEqual({
                data: ["111"],
            });
        });
    });
});
