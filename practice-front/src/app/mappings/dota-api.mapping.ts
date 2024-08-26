import {AccountModel} from "../services/dota-api/models/account.model";
import {Account} from "../types/dota-api/account.type";
import {WinLoseModel} from "../services/dota-api/models/win-lose.model";
import {WinLose} from "../types/dota-api/win-lose.type";
import {PlayerPeerModel} from "../services/dota-api/models/player-peer.model";
import {PlayerPeer} from "../types/dota-api/player-peer.type";
import {PlayerHeroModel} from "../services/dota-api/models/player-hero.model";
import {PlayerHero} from "../types/dota-api/player-hero.type";
import {PlayerMatchModel} from "../services/dota-api/models/player-match.model";
import {PlayerMatch} from "../types/dota-api/player-match.type";
import {HeroModel} from "../services/dota-api/models/hero.model";
import {Hero} from "../types/dota-api/hero.type";
import {PlayerStatsModel} from "../services/dota-api/models/player-stats.model";
import {PlayerStats} from "../types/dota-api/player-stats.type";

export class DotaApiMapping {

  static MapAccountToType(account: AccountModel): Account {
    return {
      profile: {
        name: account.profile.personaname,
        accountId: account.profile.account_id,
        avatar: account.profile.avatarfull
      }
    }
  }

  static MapWinLoseToType(winLose: WinLoseModel): WinLose {
    return {
      win: winLose.win,
      lose: winLose.lose
    }
  }

  static MapPlayerPeersToType(peers: PlayerPeerModel[]): PlayerPeer[] {
    return peers?.map(this.MapPlayerPeerToType) ?? [];
  }

  private static MapPlayerPeerToType(peer: PlayerPeerModel): PlayerPeer {
    return {
      win: peer.win,
      accountId: peer.account_id,
      avatar: peer.avatarfull,
      name: peer.personaname,
      games: peer.games,
      lastPlayed: peer.last_played * 1000
    }
  }

  static MapPlayerHeroesToType(heroes: PlayerHeroModel[]): PlayerHero[] {
    return heroes?.map(this.MapPlayerHeroToType) ?? [];
  }

  private static MapPlayerHeroToType(hero: PlayerHeroModel): PlayerHero {
    return {
      win: hero.win,
      games: hero.games,
      heroId: hero.hero_id,
      lastPlayed: hero.last_played * 1000
    }
  }

  static MapPlayerMatchesToType(matches: PlayerMatchModel[]): PlayerMatch[] {
    return matches?.map(this.MapPlayerMatchToType) ?? [];
  }

  private static MapPlayerMatchToType(match: PlayerMatchModel): PlayerMatch {
    return {
      heroId: match.hero_id,
      matchId: match.match_id,
      assists: match.assists,
      deaths: match.deaths,
      duration: match.duration,
      startTime: match.start_time * 1000,
      kills: match.kills,
      isWin: (match.radiant_win! && match.player_slot! < 100) || (!match.radiant_win && match.player_slot!! > 100)
    }
  }

  static MapHeroesToType(heroes: HeroModel[]): Hero[] {
    return heroes?.map(this.MapHeroToType) ?? [];
  }

  private static MapHeroToType(hero: HeroModel): Hero {
    return {
      id: hero.id,
      name: hero.localized_name
    }
  }

  static MapPlayerStatsToType(stats: PlayerStatsModel[]): PlayerStats {
    const n = stats[0].n;
    return {
      assists: Math.round(stats.find(stat => stat.field === 'assists')!.sum / n * 10) / 10,
      deaths: Math.round(stats.find(stat => stat.field === 'deaths')!.sum / n) * 10 / 10,
      kills: Math.round(stats.find(stat => stat.field === 'kills')!.sum / n * 10) / 10,
      actionsPerMinute: Math.round(stats.find(stat => stat.field === 'actions_per_min')!.sum / n * 10) / 10,
      denies: Math.round(stats.find(stat => stat.field === 'denies')!.sum / n * 10) / 10,
      goldPerMin: Math.round(stats.find(stat => stat.field === 'gold_per_min')!.sum / n),
      heroDamage: Math.round(stats.find(stat => stat.field === 'hero_damage')!.sum / n),
      kda: Math.round(stats.find(stat => stat.field === 'kda')!.sum / n * 10) / 10,
      heroHealing: Math.round(stats.find(stat => stat.field === 'hero_healing')!.sum / n),
      lastHits: Math.round(stats.find(stat => stat.field === 'last_hits')!.sum / n),
      xpOerMin: Math.round(stats.find(stat => stat.field === 'xp_per_min')!.sum / n)
    }
  }
}
