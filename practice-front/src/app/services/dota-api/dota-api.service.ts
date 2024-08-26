import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {AccountModel} from "./models/account.model";
import {WinLoseModel} from "./models/win-lose.model";
import {PlayerHeroModel} from "./models/player-hero.model";
import {PlayerPeerModel} from "./models/player-peer.model";
import {PlayerMatchModel} from "./models/player-match.model";
import {HeroModel} from "./models/hero.model";
import {PlayerStatsModel} from "./models/player-stats.model";

@Injectable({providedIn: 'root'})
export class DotaApiService {

  private readonly baseUrl = 'https://api.opendota.com/api';

  constructor(private httpClient: HttpClient) {
  }

  getAccount(accountId: number): Observable<AccountModel> {
    return this.httpClient.get<AccountModel>(`${this.baseUrl}/players/${accountId}`);
  }

  getWinLose(accountId: number): Observable<WinLoseModel> {
    return this.httpClient.get<WinLoseModel>(`${this.baseUrl}/players/${accountId}/wl`);
  }

  getPlayerHeroes(accountId: number): Observable<PlayerHeroModel[]> {
    return this.httpClient.get<PlayerHeroModel[]>(`${this.baseUrl}/players/${accountId}/heroes`);
  }

  getPlayerPeers(accountId: number): Observable<PlayerPeerModel[]> {
    return this.httpClient.get<PlayerPeerModel[]>(`${this.baseUrl}/players/${accountId}/peers`);
  }

  getMatches(accountId: number): Observable<PlayerMatchModel[]> {
    return this.httpClient.get<PlayerMatchModel[]>(`${this.baseUrl}/players/${accountId}/matches`);
  }

  getStats(accountId: number): Observable<PlayerStatsModel[]> {
    return this.httpClient.get<PlayerStatsModel[]>(`${this.baseUrl}/players/${accountId}/totals`);
  }

  getAllHeroes(): Observable<HeroModel[]> {
    return this.httpClient.get<{ [key: string]: HeroModel }>(`${this.baseUrl}/constants/heroes`).pipe(
      map(response => {
        return Object.values(response).map(hero => ({
          id: hero.id,
          localized_name: hero.localized_name
        }));
      })
    );
  }

}
