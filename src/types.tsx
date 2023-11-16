export type Courses = {
    id: number;
    title: String;
    description: String;
    image_path: String;
    release_date: string;
}

export type Modules = {
    id: number;
    title: string;
    description: string;
    course_id: number;
};

export enum Status {
    SUCCESS = "success",
    ERROR = "error"
}
export type Materials = {
    id: number;
    title: string;
    description: string;
    source_type: string;
    material_path: string;
};

export type Users = {
    id: number;
    username: string;
    fullname: string;
    isAdmin: string;
};
