import { dcaIncentives } from '@/lib/mockData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Trophy, Award, Target, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export function DCAIncentiveLeaderboard() {
    const sortedDCAs = [...dcaIncentives].sort((a, b) => b.totalPoints - a.totalPoints);

    return (
        <Card className="p-6 border-border">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h3 className="text-lg font-semibold text-foreground">Dynamic Incentive Engine</h3>
                    <p className="text-sm text-muted-foreground">Gamified DCA rewards with real-time leaderboard</p>
                </div>
                <Badge variant="outline" className="text-xs">15-25% Performance Uplift</Badge>
            </div>

            <div className="mb-6">
                <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                    <Trophy className="h-4 w-4 text-yellow-500" />
                    Leaderboard Rankings
                </h4>
                <div className="space-y-2">
                    {sortedDCAs.map((dca, index) => (
                        <div key={dca.dca} className={cn(
                            "border rounded-lg p-4",
                            index === 0 ? "border-yellow-500/50 bg-yellow-500/5" : "border-border"
                        )}>
                            <div className="flex items-center justify-between mb-3">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg",
                                        index === 0 ? "bg-yellow-500 text-yellow-950" :
                                            index === 1 ? "bg-gray-400 text-gray-950" :
                                                index === 2 ? "bg-orange-600 text-orange-950" :
                                                    "bg-muted text-foreground"
                                    )}>
                                        #{dca.currentRank}
                                    </div>
                                    <div>
                                        <h5 className="font-semibold text-foreground">{dca.dca}</h5>
                                        <p className="text-xs text-muted-foreground">{dca.totalPoints.toLocaleString()} points</p>
                                    </div>
                                </div>
                                {index === 0 && (
                                    <Badge variant="default" className="bg-yellow-500 text-yellow-950">
                                        <Trophy className="h-3 w-3 mr-1" />
                                        Champion
                                    </Badge>
                                )}
                            </div>

                            <div className="mb-3">
                                <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                                    <Award className="h-3 w-3" />
                                    Badges Earned
                                </p>
                                <div className="flex flex-wrap gap-1">
                                    {dca.badges.map((badge, idx) => (
                                        <Badge key={idx} variant="secondary" className="text-[10px]">
                                            {badge}
                                        </Badge>
                                    ))}
                                </div>
                            </div>

                            <div>
                                <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                                    <Target className="h-3 w-3" />
                                    Active Challenges ({dca.activeChallenges.length})
                                </p>
                                <div className="space-y-2">
                                    {dca.activeChallenges.map((challenge, idx) => (
                                        <div key={idx} className="bg-background rounded-lg p-2 border border-border/50">
                                            <div className="flex items-center justify-between mb-1">
                                                <p className="text-xs font-medium text-foreground">{challenge.name}</p>
                                                <span className="text-[10px] text-muted-foreground">
                                                    {challenge.progress}/{challenge.target}
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <div className="flex-1 h-1.5 rounded-full bg-muted overflow-hidden">
                                                    <div
                                                        className={cn(
                                                            "h-full rounded-full transition-all",
                                                            challenge.progress >= challenge.target ? "bg-green-600" : "bg-blue-600"
                                                        )}
                                                        style={{ width: `${Math.min((challenge.progress / challenge.target) * 100, 100)}%` }}
                                                    />
                                                </div>
                                                <span className="text-[10px] font-bold text-foreground">
                                                    {Math.round((challenge.progress / challenge.target) * 100)}%
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {dca.recentEvents.length > 0 && (
                                <div className="mt-3 pt-3 border-t border-border/50">
                                    <p className="text-xs font-medium text-muted-foreground mb-2 flex items-center gap-1">
                                        <TrendingUp className="h-3 w-3" />
                                        Recent Achievements
                                    </p>
                                    <div className="space-y-1">
                                        {dca.recentEvents.map((event, idx) => (
                                            <div key={idx} className="flex items-center justify-between text-xs">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-muted-foreground">{event.eventType}</span>
                                                    {event.badge && (
                                                        <Badge variant="outline" className="text-[9px] h-4 px-1">
                                                            {event.badge}
                                                        </Badge>
                                                    )}
                                                </div>
                                                <span className="font-bold text-green-600">+{event.points} pts</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-border">
                <div className="text-center">
                    <p className="text-2xl font-bold text-foreground">{dcaIncentives.length}</p>
                    <p className="text-xs text-muted-foreground">Active DCAs</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-accent">
                        {dcaIncentives.reduce((sum, d) => sum + d.activeChallenges.length, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">Active Challenges</p>
                </div>
                <div className="text-center">
                    <p className="text-2xl font-bold text-green-600">
                        {dcaIncentives.reduce((sum, d) => sum + d.badges.length, 0)}
                    </p>
                    <p className="text-xs text-muted-foreground">Badges Earned</p>
                </div>
            </div>
        </Card>
    );
}
