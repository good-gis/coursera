import { TuiDay } from "@taiga-ui/cdk";

export interface Course {
    id: string;
    title: string;
    creationDate: Date;
    publicationDate: TuiDay;
    duration: number;
    description: string;
    topRated: boolean;
    authors: string[];
}
