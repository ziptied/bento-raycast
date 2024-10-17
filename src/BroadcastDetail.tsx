import { Detail, Icon, Color } from "@raycast/api";
import { Broadcast } from "./api-client";

interface BroadcastDetailProps {
    broadcast: Broadcast;
}

function htmlToMarkdown(html: string): string {
    // This is a simple conversion and doesn't cover all HTML elements
    // For a more comprehensive solution, consider using a library like 'turndown'
    return html
        .replace(/<h1>(.*?)<\/h1>/gi, '# $1\n')
        .replace(/<h2>(.*?)<\/h2>/gi, '## $1\n')
        .replace(/<h3>(.*?)<\/h3>/gi, '### $1\n')
        .replace(/<h4>(.*?)<\/h4>/gi, '#### $1\n')
        .replace(/<h5>(.*?)<\/h5>/gi, '##### $1\n')
        .replace(/<h6>(.*?)<\/h6>/gi, '###### $1\n')
        .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
        .replace(/<b>(.*?)<\/b>/gi, '**$1**')
        .replace(/<em>(.*?)<\/em>/gi, '*$1*')
        .replace(/<i>(.*?)<\/i>/gi, '*$1*')
        .replace(/<a href="(.*?)">(.*?)<\/a>/gi, '[$2]($1)')
        .replace(/<ul>/gi, '\n')
        .replace(/<\/ul>/gi, '\n')
        .replace(/<li>(.*?)<\/li>/gi, '- $1\n')
        .replace(/<br\s*\/?>/gi, '\n')
        .replace(/<p>(.*?)<\/p>/gi, '$1\n\n')
        .replace(/&nbsp;/g, ' ')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/<br class="a-happy-little-line-break">/g, '---')
        .replace(/&amp;/g, '&');
}

function calculateOpenRate(stats: Broadcast['stats']): number | null {
    if (stats?.recipients > 0 && stats?.total_opens >= 0) {
        return (stats.total_opens / stats.recipients) * 100;
    }
    return null;
}

export default function BroadcastDetail({ broadcast }: BroadcastDetailProps) {
    const markdownContent = htmlToMarkdown(broadcast.template.html);

    const markdown = `
# Broadcast - ${broadcast.name}

### Email Preview

${markdownContent}
`;

    const currentTime = new Date();
    const sendAtTime = broadcast.send_at ? new Date(broadcast.send_at) : null;
    const isSendScheduled = sendAtTime && sendAtTime > currentTime;

    const sentFinalBatchTime = broadcast.sent_final_batch_at ? new Date(broadcast.sent_final_batch_at) : null;
    const isSendComplete = sentFinalBatchTime && sentFinalBatchTime <= currentTime;

    const openRate = calculateOpenRate(broadcast.stats);

    return (
        <Detail
            markdown={markdown}
            navigationTitle={broadcast.name}
            metadata={
                <Detail.Metadata>
                    <Detail.Metadata.Label title="Created At" text={new Date(broadcast.created_at).toLocaleString()} />
                    {isSendScheduled ? (
                        <Detail.Metadata.TagList title="Send Status">
                            <Detail.Metadata.TagList.Item text="Send Scheduled" color={Color.Yellow} />
                        </Detail.Metadata.TagList>
                    ) : (
                        <Detail.Metadata.Label
                            title="Send At"
                            text={broadcast.send_at ? new Date(broadcast.send_at).toLocaleString() : 'N/A'}
                        />
                    )}
                    {isSendComplete ? (
                        <Detail.Metadata.TagList title="Send Status">
                            <Detail.Metadata.TagList.Item text="Send Complete" color={Color.Green} />
                        </Detail.Metadata.TagList>
                    ) : (
                        <Detail.Metadata.Label
                            title="Sent Final Batch At"
                            text={sentFinalBatchTime ? sentFinalBatchTime.toLocaleString() : 'Not sent yet'}
                        />
                    )}
                    {openRate !== null ? (
                        <Detail.Metadata.Label
                            title="Open Rate"
                            text={`${Math.round(openRate)}%`}
                        />
                    ) : (
                        <Detail.Metadata.TagList title="Open Rate">
                            <Detail.Metadata.TagList.Item
                                text="Pending"
                                icon={Icon.CircleProgress}
                                color={Color.SecondaryText}
                            />
                        </Detail.Metadata.TagList>
                    )}
                    <Detail.Metadata.Label
                        title="Recipients"
                        text={broadcast.stats?.recipients?.toString() || 'N/A'}
                    />
                    <Detail.Metadata.Label
                        title="Total Opens"
                        text={broadcast.stats?.total_opens?.toString() || 'N/A'}
                    />
                    <Detail.Metadata.Label
                        title="Total Clicks"
                        text={broadcast.stats?.total_clicks?.toString() || 'N/A'}
                    />
                    <Detail.Metadata.Label title="Broadcast ID" text={broadcast.id} />
                    <Detail.Metadata.Separator />
                    <Detail.Metadata.Label title="Template Subject" text={broadcast.template?.subject || 'N/A'} />
                    <Detail.Metadata.Label title="Template To" text={broadcast.template?.to || 'N/A'} />
                    <Detail.Metadata.Separator />
                    <Detail.Metadata.Link title="Share URL" target={broadcast.share_url} text="Open Share URL" />
                </Detail.Metadata>
            }
        />
    );
}