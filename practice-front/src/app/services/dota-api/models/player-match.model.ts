export type PlayerMatchModel = {
  match_id: string;
  radiant_win: boolean;
  player_slot: number;
  duration: number;
  hero_id: number;
  kills: number;
  deaths: number;
  assists: number;
  start_time: number;
}
