import { Card, Text, Badge, Pane } from 'evergreen-ui';

import type { ReviewProp } from './types';

type ReviewCardProps = {
    review: ReviewProp;
};

export function ReviewCard({ review }: ReviewCardProps) {
    const isNotFound = review.course_name === 'No review found';

    const renderStars = (rating: number) => {
        return '⭐'.repeat(Math.min(Math.max(rating, 0), 5));
    };

    return (
        <Card
            elevation={1}
            padding={16}
            display='flex'
            flexDirection='column'
            background='white'
            hoverElevation={2}
        >
            {!isNotFound && (
                <>
                    <Pane display='flex' justifyContent='space-between' alignItems='center' marginBottom={8}>
                        <Text size={500} fontWeight={600}>
                            {review.course_name}
                        </Text>
                        {review.id && (
                            <Badge color='neutral'>ID: {review.id}</Badge>
                        )}
                    </Pane>

                    <Text size={400} marginBottom={12}>
                        {renderStars(review.rating)} ({review.rating}/5)
                    </Text>

                    {review.user_net_ids.length > 0 && (
                        <Pane display='flex' gap={4} flexWrap='wrap'>
                            <Text size={300} color='muted'>Users:</Text>
                            {review.user_net_ids.map((netId) => (
                                <Badge key={netId} color='blue'>
                                    {netId}
                                </Badge>
                            ))}
                        </Pane>
                    )}
                </>
            )}

            {isNotFound && (
                <Text size={500} fontWeight={600}>
                    {review.course_name}
                </Text>
            )}
        </Card>
    );
}
