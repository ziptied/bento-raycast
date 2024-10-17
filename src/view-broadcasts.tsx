import { useEffect, useState } from "react";
import { List, ActionPanel, Action, showToast, Toast, Icon, Color } from "@raycast/api";
import { getBroadcasts, Broadcast } from "./api-client";
import BroadcastDetail from "./BroadcastDetail";

export default function ViewBroadcasts() {
    const [broadcasts, setBroadcasts] = useState<Broadcast[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        async function fetchBroadcasts() {
            try {
                const fetchedBroadcasts = await getBroadcasts();
                setBroadcasts(fetchedBroadcasts);
            } catch (error) {
                showToast(Toast.Style.Failure, "Failed to fetch broadcasts");
            } finally {
                setIsLoading(false);
            }
        }
        fetchBroadcasts();
    }, []);

    const calculateOpenRate = (stats: Broadcast['stats']): number | null => {
        if (stats.recipients > 0 && stats.total_opens >= 0) {
            return (stats.total_opens / stats.recipients) * 100;
        }
        return null;
    };

    const getOpenRateAccessory = (broadcast: Broadcast) => {
        const openRate = calculateOpenRate(broadcast.stats);

        let icon: Icon;
        let color: Color;

        if (openRate === null) {
            icon = Icon.CircleProgress;
            color = Color.SecondaryText;
        } else if (openRate <= 25) {
            icon = Icon.CircleProgress25;
            color = Color.Red;
        } else if (openRate <= 50) {
            icon = Icon.CircleProgress50;
            color = Color.Orange;
        } else if (openRate <= 75) {
            icon = Icon.CircleProgress75;
            color = Color.Yellow;
        } else {
            icon = Icon.CircleProgress100;
            color = Color.Green;
        }

        return {
            icon: { source: icon, tintColor: color },
            text: openRate !== null ? `Open Rate: ${Math.round(openRate)}%` : "Pending"
        };
    };

    const getSendStatusAccessory = (broadcast: Broadcast) => {
        const sentFinalBatchTime = broadcast.sent_final_batch_at ? new Date(broadcast.sent_final_batch_at) : null;
        const currentTime = new Date();

        if (sentFinalBatchTime && sentFinalBatchTime <= currentTime) {
            return {
                icon: { source: Icon.CheckCircle, tintColor: Color.Green },
                text: "Sending Complete"
            };
        } else {
            return {
                icon: { source: Icon.Info, tintColor: Color.SecondaryText },
                text: "Sending Not Complete"
            };
        }
    };

    return (
        <List isLoading={isLoading}>
            {broadcasts.map((broadcast) => (
                <List.Item
                    key={broadcast.created_at}
                    title={broadcast.name}
                    subtitle={`Created at: ${new Date(broadcast.created_at).toLocaleString()}`}
                    accessories={[
                        getSendStatusAccessory(broadcast),
                        getOpenRateAccessory(broadcast)
                    ]}
                    actions={
                        <ActionPanel>
                            <Action.Push
                                title="View Details"
                                target={<BroadcastDetail broadcast={broadcast} />}
                            />
                            <Action.CopyToClipboard content={broadcast.share_url} title="Copy Share URL" />
                        </ActionPanel>
                    }
                />
            ))}
        </List>
    );
}