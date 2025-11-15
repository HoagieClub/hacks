import { Card, Text, Badge, Pane } from 'evergreen-ui';

import type { UserProp } from './types';

type UserCardProps = {
    user: UserProp;
};

export function UserCard({ user }: UserCardProps) {
    const isNotFound = user.first_name === 'No user found';
    const fullName = isNotFound
        ? user.first_name
        : `${user.first_name} ${user.last_name} (${user.net_id})`;

    return (
        <Card
            elevation={1}
            padding={16}
            display='flex'
            flexDirection='column'
            background='white'
            hoverElevation={2}
        >
            <Text size={500} fontWeight={600} marginBottom={4}>
                {fullName}
            </Text>
            {!isNotFound && (user.class_year || user.major_code) && (
                <Pane display='flex' gap={8} alignItems='center' marginBottom={4}>
                    {user.class_year && (
                        <Badge color='blue'>Class of {user.class_year}</Badge>
                    )}
                    {user.major_code && (
                        <Badge color='green'>{user.major_code}</Badge>
                    )}
                </Pane>
            )}
        </Card>
    );
}
