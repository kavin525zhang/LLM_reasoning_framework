import type { IGrammarBase, IMark, IRunningConfig } from '../types';
import type { DiffResult } from '../types/base';
import type { IViewDiff } from '../types/morph';
export declare class ViewDiff implements IViewDiff {
    diffGrammar<U extends IGrammarBase>(prevGrammars: U[], nextGrammars: U[]): DiffResult<U, U>;
    diffMark(prevMarks: IMark[], nextMarks: IMark[], runningConfig: IRunningConfig): DiffResult<IMark[], IMark[]>;
    private diffUpdateByGroup;
}
