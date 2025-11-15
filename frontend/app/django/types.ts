export interface Major {
    id: number;
    name: string;
    code: string;
    description: string;
    urls: Record<string, string>;
}

export interface User {
    id: number;
    first_name: string;
    last_name: string;
    net_id: string;
    class_year: number;
    major: Major | null;
}

export interface UserProp {
    first_name: string;
    last_name: string;
    net_id: string;
    class_year: number | null;
    major_code?: string | null;
    major_name?: string | null;
}

export interface Review {
    id: number;
    course_name: string;
    rating: number;
    user_net_ids: string[];
}

export interface ReviewProp {
    id?: number;
    course_name: string;
    rating: number;
    user_net_ids: string[];
}
