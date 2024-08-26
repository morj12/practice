import {Component, OnInit} from '@angular/core';
import {DotaApiService} from "../../services/dota-api/dota-api.service";
import {EMPTY, forkJoin, mergeMap, Observable, tap} from "rxjs";
import {HeroModel} from "../../services/dota-api/models/hero.model";
import {AsyncPipe, DatePipe, NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {AccountModel} from "../../services/dota-api/models/account.model";
import {PlayerPeerModel} from "../../services/dota-api/models/player-peer.model";
import {PlayerMatchModel} from "../../services/dota-api/models/player-match.model";
import {PlayerHeroModel} from "../../services/dota-api/models/player-hero.model";
import {WinLoseModel} from "../../services/dota-api/models/win-lose.model";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {Hero} from "../../types/dota-api/hero.type";
import {Account} from "../../types/dota-api/account.type";
import {PlayerHero} from "../../types/dota-api/player-hero.type";
import {PlayerMatch} from "../../types/dota-api/player-match.type";
import {PlayerPeer} from "../../types/dota-api/player-peer.type";
import {WinLose} from "../../types/dota-api/win-lose.type";
import {DotaApiMapping} from "../../mappings/dota-api.mapping";
import {PlayerStats} from "../../types/dota-api/player-stats.type";
import {PlayerStatsModel} from "../../services/dota-api/models/player-stats.model";
import * as Highcharts from 'highcharts';
import {HighchartsChartModule} from "highcharts-angular";

@Component({
  selector: 'about',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    AsyncPipe,
    NgOptimizedImage,
    DatePipe,
    MatProgressSpinner,
    HighchartsChartModule
  ],
  templateUrl: './about.component.html',
  styleUrl: './about.component.scss'
})
export class AboutComponent implements OnInit {

  private readonly heroImageUrl = 'https://cdn.cloudflare.steamstatic.com/apps/dota2/images/dota_react/heroes';
  private readonly accountIdExample = 1163052750;

  heroes: Hero[] = [];
  account?: Account;
  playerHeroes: PlayerHero[] = [];
  playerPeers: PlayerPeer[] = [];
  playerMatches: PlayerMatch[] = [];
  playerWinLose?: WinLose;
  playerStats?: PlayerStats;

  loadConstants$: Observable<any> = EMPTY;

  Highcharts: typeof Highcharts = Highcharts;
  popularityChartOptions?: Highcharts.Options;
  winrateChartOptions?: Highcharts.Options;

  constructor(private dotaApiService: DotaApiService) {
  }

  ngOnInit() {
    this.loadConstants$ = forkJoin([this.loadAllHeroes()])
      .pipe(mergeMap(() => {
        return forkJoin([
          this.loadAccount(),
          this.loadPlayerHeroes(),
          this.loadPlayerMatches(),
          this.loadPlayerWinLose(),
          this.loadPlayerHeroes(),
          this.loadPlayerPeers(),
          this.loadPlayerStats()
        ])
      }));
  }

  loadAllHeroes() {
    return this.dotaApiService.getAllHeroes().pipe(
      tap((heroes: HeroModel[]) => {
        this.heroes = DotaApiMapping.MapHeroesToType(heroes);
      })
    );
  }

  loadAccount() {
    return this.dotaApiService.getAccount(this.accountIdExample).pipe(
      tap((result: AccountModel) => {
        this.account = DotaApiMapping.MapAccountToType(result);
      })
    );
  }

  loadPlayerWinLose() {
    return this.dotaApiService.getWinLose(this.accountIdExample).pipe(
      tap((result: WinLoseModel) => {
        this.playerWinLose = DotaApiMapping.MapWinLoseToType(result);
      })
    );
  }

  loadPlayerHeroes() {
    return this.dotaApiService.getPlayerHeroes(this.accountIdExample).pipe(
      tap((result: PlayerHeroModel[]) => {
        this.playerHeroes = DotaApiMapping.MapPlayerHeroesToType(result.filter(hero => hero.games >= 5));
        this.createPieChartWithHeroesByPopularity();
        this.createPieChartHeroesByWinrate();
      })
    );
  }

  loadPlayerPeers() {
    return this.dotaApiService.getPlayerPeers(this.accountIdExample).pipe(
      tap((result: PlayerPeerModel[]) => {
        this.playerPeers = DotaApiMapping.MapPlayerPeersToType(result);
      })
    );
  }

  loadPlayerMatches() {
    return this.dotaApiService.getMatches(this.accountIdExample).pipe(
      tap((result: PlayerMatchModel[]) => {
        this.playerMatches = DotaApiMapping.MapPlayerMatchesToType(result).slice(0, 20);
      })
    );
  }

  loadPlayerStats() {
    return this.dotaApiService.getStats(this.accountIdExample).pipe(
      tap((result: PlayerStatsModel[]) => {
        this.playerStats = DotaApiMapping.MapPlayerStatsToType(result);
      })
    );
  }

  getHeroUrl(heroId: number) {
    let heroName = this.heroes.find(hero => hero.id == heroId)?.name;

    //#region special cases -> no logic
    if (heroName === 'Windranger') heroName = 'Windrunner';
    if (heroName === 'Clockwerk') heroName = 'RattleTrap';
    if (heroName === 'Nature\'s Prophet') heroName = 'Furion';
    if (heroName === 'Treant Protector') heroName = 'Treant';
    if (heroName === 'Underlord') heroName = 'Abyssal Underlord';
    if (heroName === 'Anti-Mage') heroName = 'Antimage';
    if (heroName === 'Shadow Fiend') heroName = 'Nevermore';
    if (heroName === 'Outworld Devourer') heroName = 'Obsidian Destroyer';
    //#endregion special cases -> no logic

    return `${this.heroImageUrl}/${this.replaceSpacesWithUnderscore(heroName)}.png`;
  }

  replaceSpacesWithUnderscore(input?: string): string {
    return !input ? '' : input.replace(/ /g, '_').toLowerCase();
  }

  createPieChartWithHeroesByPopularity() {
    this.popularityChartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Heroes popularity diagram'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Percentage',
        data: this.getHeroesPopularityChartData()
      }]
    };
  }

  getHeroesPopularityChartData() {
    let mostPlayedHeroes = [...this.playerHeroes]
      .sort((a, b) => b.games - a.games)
      .slice(0, 10);

    return mostPlayedHeroes.map(playerHero => {
      let hero = this.heroes.find(hero => hero.id == playerHero.heroId);
      return {
        name: hero!.name,
        y: playerHero.games
      }
    })
  }

  createPieChartHeroesByWinrate() {
    this.winrateChartOptions = {
      chart: {
        type: 'pie'
      },
      title: {
        text: 'Heroes winrate diagram'
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
      },
      accessibility: {
        point: {
          valueSuffix: '%'
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          dataLabels: {
            enabled: true,
            format: '<b>{point.name}</b>: {point.y} %'
          }
        }
      },
      series: [{
        type: 'pie',
        name: 'Percentage',
        data: this.getHeroesWinrateChartData()
      }]
    };
  }

  getHeroesWinrateChartData() {
    let mostPlayedHeroes = [...this.playerHeroes]
      .sort((a, b) => b.games - a.games)
      .slice(0, 10);

    return mostPlayedHeroes.map(playerHero => {
      let hero = this.heroes.find(hero => hero.id == playerHero.heroId);
      return {
        name: hero!.name,
        y: Math.round(playerHero.win / playerHero.games * 100 * 10) / 10
      }
    })
  }
}
