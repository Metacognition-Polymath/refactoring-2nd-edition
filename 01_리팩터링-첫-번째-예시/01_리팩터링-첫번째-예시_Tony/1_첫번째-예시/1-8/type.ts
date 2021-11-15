export type Performance = {
  playID: 'hamlet' | 'asLike' | 'othello';
  audience: number;
};

export type Invoice = {
  customer: string;
  performances: Performance[];
};

export type PlayDetail = {
  name: string;
  type: 'tragedy' | 'comedy';
};

export type Plays = {
  hamlet: PlayDetail;
  asLike: PlayDetail;
  othello: PlayDetail;
};

export type StatementPerformance = Performance & {
  play: PlayDetail;
  amount: number;
  volumeCredits: number;
};

export type StatementData = {
  customer: string; // customer?: string; 로 선언했던 것을 statementData에 직접 선언하므로서 undefined를 잡지 않아도 됨
  performances: StatementPerformance[]; // Performance[];
  totalAmount: number;
  totalVolumeCredits: number;
};
