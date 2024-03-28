import { Request as ExpressRequest } from 'express';

// Define the structure of the file object
interface UploadedFile {
    fieldname: string;
    originalname: string;
    encoding: string;
    mimetype: string;
    size: number;
    // Add more properties if needed
}

// Extend the Request object to include the files property
interface CustomRequest extends ExpressRequest {
    files: { [fieldname: string]: UploadedFile[] }; // Assuming multiple files can be uploaded with the same fieldname
}
export default CustomRequest;