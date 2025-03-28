import { Address, beginCell, Cell, Contract, contractAddress, ContractProvider, Sender, SendMode } from '@ton/core';

export type LearnFunCConfig = {};

export function learnFunCConfigToCell(config: LearnFunCConfig): Cell {
    return beginCell().endCell();
}

export class LearnFunC implements Contract {
    constructor(readonly address: Address, readonly init?: { code: Cell; data: Cell }) {}

    static createFromAddress(address: Address) {
        return new LearnFunC(address);
    }

    static createFromConfig(config: LearnFunCConfig, code: Cell, workchain = 0) {
        const data = learnFunCConfigToCell(config);
        const init = { code, data };
        return new LearnFunC(contractAddress(workchain, init), init);
    }

    async sendDeploy(provider: ContractProvider, via: Sender, value: bigint) {
        await provider.internal(via, {
            value,
            sendMode: SendMode.PAY_GAS_SEPARATELY,
            body: beginCell().endCell(),
        });
    }
}
