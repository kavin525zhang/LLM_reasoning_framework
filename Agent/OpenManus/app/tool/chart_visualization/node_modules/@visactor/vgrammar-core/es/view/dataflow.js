import { isNil, Logger } from "@visactor/vutils";

import { Heap } from "../util/grammar-heap";

import { UniqueList } from "../util/unique-list";

export default class Dataflow {
    constructor() {
        this.grammars = [], this.logger = Logger.getInstance(), this._curRank = 0, this._committed = new UniqueList((grammar => grammar.uid)), 
        this._heap = new Heap(((a, b) => (null == a ? void 0 : a.qrank) - (null == b ? void 0 : b.qrank))), 
        this._beforeRunner = null, this._afterRunner = null, this._updateCounter = 0, this._finishFirstRender = !1;
    }
    add(grammar) {
        if (grammar) return this._setRankOfGrammar(grammar), this.commit(grammar), !this.grammars.includes(grammar) && (this.grammars.push(grammar), 
        !0);
    }
    remove(grammar) {
        grammar && (this._committed.remove(grammar), this._heap.remove(grammar), this.grammars = this.grammars.filter((storedGrammar => storedGrammar !== grammar)));
    }
    _setRankOfGrammar(grammar) {
        grammar && (grammar.rank = ++this._curRank);
    }
    _reRank(grammar) {
        const queue = [ grammar ];
        for (;queue.length; ) {
            const cur = queue.pop();
            this._setRankOfGrammar(cur);
            const list = cur.targets;
            list && list.forEach((entry => {
                queue.push(entry), entry === grammar && this.logger.error("Cycle detected in dataflow graph.");
            }));
        }
    }
    _enqueue(grammar) {
        grammar && (grammar.qrank = grammar.rank, this._heap.push(grammar));
    }
    _logGrammarRunInfo(grammar) {
        if (this.logger.canLogError()) {
            const debugStr = [ {
                key: "id",
                value: grammar.id()
            }, {
                key: "name",
                value: grammar.name()
            } ].reduce(((str, entry, index) => isNil(entry.value) ? str : `${str}${index ? " , " : ""}${entry.key}: ${entry.value}`), "");
            this.logger.debug("Run Operator: ", grammar, debugStr);
        }
    }
    hasCommitted() {
        return !!this._committed.length;
    }
    commit(grammar) {
        return this._committed.add(grammar), this;
    }
    _beforeEvaluate() {
        this.grammars.forEach((grammar => {
            grammar.targets.some((target => (null == target ? void 0 : target.rank) < (null == grammar ? void 0 : grammar.rank))) && this._reRank(grammar);
        })), this._committed.forEach((grammar => this._enqueue(grammar))), this._committed = new UniqueList((grammar => grammar.uid));
    }
    _enqueueTargets(grammar) {
        grammar.targets && grammar.targets.length && this._finishFirstRender && grammar.targets.forEach((target => this._enqueue(target)));
    }
    evaluate() {
        if (this._beforeRunner && this._beforeRunner(this), !this._committed.length) return this.logger.info("Dataflow invoked, but nothing to do."), 
        !1;
        this._updateCounter += 1;
        let grammar, dt, count = 0;
        for (this.logger.canLogInfo() && (dt = Date.now(), this.logger.debug(`-- START PROPAGATION (${this._updateCounter}) -----`)), 
        this._beforeEvaluate(); this._heap.size() > 0; ) grammar = this._heap.pop(), grammar && (grammar.rank === grammar.qrank ? (grammar.run(), 
        this._logGrammarRunInfo(grammar), this._enqueueTargets(grammar), count += 1) : this._enqueue(grammar));
        return this.logger.canLogInfo() && (dt = Date.now() - dt, this.logger.info(`> ${count} grammars updated; ${dt} ms`)), 
        this._afterRunner && this._afterRunner(this), this._finishFirstRender = !0, !0;
    }
    runBefore(callback) {
        this._beforeRunner = callback;
    }
    runAfter(callback) {
        this._afterRunner = callback;
    }
    release() {
        this._heap && (this._heap.clear(), this._heap = null), this.logger = null, this._committed = null;
    }
}
//# sourceMappingURL=dataflow.js.map
