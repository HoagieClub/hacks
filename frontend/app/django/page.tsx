'use client';

import { useState } from 'react';
import type { ChangeEvent, FormEvent } from 'react';

import { Pane, Heading, TextInput, Button, Card, Label, Text } from 'evergreen-ui';

import { ReviewCard } from './ReviewCard';
import { UserCard } from './UserCard';

import type { UserProp, ReviewProp } from './types';

export function Django() {
    const [netId, setNetId] = useState<string>('');
    const [queriedUser, setQueriedUser] = useState<UserProp | null>(null);
    const [formData, setFormData] = useState({
        first_name: '',
        last_name: '',
        net_id: '',
        class_year: '',
        major_code: '',
    });

    const [reviewNetId, setReviewNetId] = useState<string>('');
    const [queriedReviews, setQueriedReviews] = useState<ReviewProp[]>([]);
    const [reviewFormData, setReviewFormData] = useState({
        course_name: '',
        rating: '',
        user_net_ids: '',
    });

    async function handleQueryUser() {
        if (!netId) {
            return;
        }

        setQueriedUser(null);

        try {
            const response = await fetch(`http://localhost:8000/user/${netId}/`);

            if (!response.ok) {
                setQueriedUser({
                    first_name: 'No user found',
                    last_name: '',
                    net_id: netId,
                    class_year: 0,
                });
                return;
            }

            const data = await response.json();
            setQueriedUser({
                first_name: data.first_name,
                last_name: data.last_name,
                net_id: data.net_id,
                class_year: data.class_year,
                major_code: data.major_code,
                major_name: data.major_name,
            });
        } catch (error) {
            console.error(`Failed to fetch user: ${error}`);
            setQueriedUser({
                first_name: 'No user found',
                last_name: '',
                net_id: '',
                class_year: null,
            });
        }
    }

    function handleFormChange(event: ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        setFormData(function (prev) {
            return { ...prev, [name]: value };
        });
    }

    async function handleCreateUser(event: FormEvent) {
        event.preventDefault();

        try {
            const requestBody = {
                first_name: formData.first_name,
                last_name: formData.last_name,
                net_id: formData.net_id,
                class_year: parseInt(formData.class_year),
                ...(formData.major_code.trim() && { major_code: formData.major_code.trim() }),
            };

            const response = await fetch(`http://localhost:8000/user/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            if (!response.ok) {
                throw new Error(`Failed to create user`);
            }

            setFormData({
                first_name: '',
                last_name: '',
                net_id: '',
                class_year: '',
                major_code: '',
            });
        } catch (error) {
            console.error(`Failed to create user: ${error}`);
        }
    }

    async function handleQueryReview() {
        if (!reviewNetId) {
            return;
        }

        setQueriedReviews([]);

        try {
            const response = await fetch(`http://localhost:8000/user/${reviewNetId}/reviews/`);

            if (!response.ok) {
                setQueriedReviews([]);
                return;
            }

            const data = await response.json();
            setQueriedReviews(data);
        } catch (error) {
            console.error(`Failed to fetch reviews: ${error}`);
            setQueriedReviews([]);
        }
    }

    function handleReviewFormChange(event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = event.target;
        setReviewFormData(function (prev) {
            return { ...prev, [name]: value };
        });
    }

    async function handleCreateReview(event: FormEvent) {
        event.preventDefault();

        try {
            const userNetIdsArray = reviewFormData.user_net_ids
                .split(',')
                .map(id => id.trim())
                .filter(id => id.length > 0);

            const response = await fetch(`http://localhost:8000/review/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    course_name: reviewFormData.course_name,
                    rating: parseInt(reviewFormData.rating),
                    user_net_ids: userNetIdsArray,
                }),
            });

            if (!response.ok) {
                throw new Error(`Failed to create review`);
            }

            setReviewFormData({
                course_name: '',
                rating: '',
                user_net_ids: '',
            });
        } catch (error) {
            console.error(`Failed to create review: ${error}`);
        }
    }

    return (
        <Pane padding={32} background='tint1' minHeight='100vh'>
            <Heading size={800} marginBottom={24} textAlign='center'>
                HoagieHacks Django Demo
            </Heading>

            <Pane display='flex' gap={24} flexWrap='wrap' flexDirection='row'>
                {/* Create User Section */}
                <Card
                    elevation={1}
                    padding={24}
                    background='white'
                    flex='1 1 calc(50% - 12px)'
                    minWidth={300}
                >
                    <Heading size={600} marginBottom={16}>
                        Create User
                    </Heading>
                    <form onSubmit={handleCreateUser}>

                        <Pane marginBottom={12}>
                            <Label htmlFor='first_name' marginBottom={4} display='block'>
                                First Name
                            </Label>
                            <TextInput
                                id='first_name'
                                name='first_name'
                                value={formData.first_name}
                                onChange={handleFormChange}
                                width='100%'
                                required
                            />
                        </Pane>

                        <Pane marginBottom={12}>
                            <Label htmlFor='last_name' marginBottom={4} display='block'>
                                Last Name
                            </Label>
                            <TextInput
                                id='last_name'
                                name='last_name'
                                value={formData.last_name}
                                onChange={handleFormChange}
                                width='100%'
                                required
                            />
                        </Pane>

                        <Pane marginBottom={12}>
                            <Label htmlFor='net_id' marginBottom={4} display='block'>
                                Net ID
                            </Label>
                            <TextInput
                                id='net_id'
                                name='net_id'
                                value={formData.net_id}
                                onChange={handleFormChange}
                                width='100%'
                                required
                            />
                        </Pane>

                        <Pane marginBottom={12}>
                            <Label htmlFor='class_year' marginBottom={4} display='block'>
                                Class Year
                            </Label>
                            <TextInput
                                id='class_year'
                                name='class_year'
                                type='number'
                                value={formData.class_year}
                                onChange={handleFormChange}
                                width='100%'
                                required
                            />
                        </Pane>

                        <Pane marginBottom={12}>
                            <Label htmlFor='major_code' marginBottom={4} display='block'>
                                Major Code
                            </Label>
                            <TextInput
                                id='major_code'
                                name='major_code'
                                placeholder='e.g., COS, ECE, MAE'
                                value={formData.major_code}
                                onChange={handleFormChange}
                                width='100%'
                            />
                        </Pane>

                        <Button
                            appearance='primary'
                            type='submit'
                            width='100%'
                        >
                            Create User
                        </Button>
                    </form>
                </Card>

                {/* Query User Section */}
                <Card
                    elevation={1}
                    padding={24}
                    background='white'
                    flex='1 1 calc(50% - 12px)'
                    minWidth={300}
                >
                    <Heading size={600} marginBottom={16}>
                        Query User
                    </Heading>
                    <Pane display='flex' gap={8} marginBottom={16}>
                        <TextInput
                            placeholder='Enter User ID...'
                            value={netId}
                            onChange={function (e: ChangeEvent<HTMLInputElement>) {
                                setNetId(e.target.value);
                            }}
                            flex='1'
                        />
                        <Button
                            appearance='primary'
                            onClick={handleQueryUser}
                        >
                            Search
                        </Button>
                    </Pane>

                    {queriedUser && <UserCard user={queriedUser} />}
                </Card>

                {/* Create Review Section */}
                <Card
                    elevation={1}
                    padding={24}
                    background='white'
                    flex='1 1 calc(50% - 12px)'
                    minWidth={300}
                >
                    <Heading size={600} marginBottom={16}>
                        Create Review
                    </Heading>
                    <form onSubmit={handleCreateReview}>

                        <Pane marginBottom={12}>
                            <Label htmlFor='course_name' marginBottom={4} display='block'>
                                Course Name
                            </Label>
                            <TextInput
                                id='course_name'
                                name='course_name'
                                placeholder='e.g., COS 126'
                                value={reviewFormData.course_name}
                                onChange={handleReviewFormChange}
                                width='100%'
                                required
                            />
                        </Pane>

                        <Pane marginBottom={12}>
                            <Label htmlFor='rating' marginBottom={4} display='block'>
                                Rating (1-5)
                            </Label>
                            <TextInput
                                id='rating'
                                name='rating'
                                type='number'
                                min='1'
                                max='5'
                                value={reviewFormData.rating}
                                onChange={handleReviewFormChange}
                                width='100%'
                                required
                            />
                        </Pane>

                        <Pane marginBottom={12}>
                            <Label htmlFor='user_net_ids' marginBottom={4} display='block'>
                                User Net IDs (comma-separated)
                            </Label>
                            <TextInput
                                id='user_net_ids'
                                name='user_net_ids'
                                placeholder='e.g., user1, user2, user3'
                                value={reviewFormData.user_net_ids}
                                onChange={handleReviewFormChange}
                                width='100%'
                            />
                        </Pane>

                        <Button
                            appearance='primary'
                            type='submit'
                            width='100%'
                        >
                            Create Review
                        </Button>
                    </form>
                </Card>

                {/* Query Review Section */}
                <Card
                    elevation={1}
                    padding={24}
                    background='white'
                    flex='1 1 calc(50% - 12px)'
                    minWidth={300}
                >
                    <Heading size={600} marginBottom={16}>
                        Query Reviews by User
                    </Heading>
                    <Pane display='flex' gap={8} marginBottom={16}>
                        <TextInput
                            placeholder='Enter User Net ID...'
                            value={reviewNetId}
                            onChange={function (e: ChangeEvent<HTMLInputElement>) {
                                setReviewNetId(e.target.value);
                            }}
                            flex='1'
                        />
                        <Button
                            appearance='primary'
                            onClick={handleQueryReview}
                        >
                            Search
                        </Button>
                    </Pane>

                    {queriedReviews.length > 0 && (
                        <Pane display='flex' flexDirection='column' gap={12}>
                            {queriedReviews.map((review) => (
                                <ReviewCard key={review.id} review={review} />
                            ))}
                        </Pane>
                    )}
                    {queriedReviews.length === 0 && reviewNetId && (
                        <Text color='muted'>No reviews found for this user.</Text>
                    )}
                </Card>


            </Pane>
        </Pane>
    );
}

export default Django;