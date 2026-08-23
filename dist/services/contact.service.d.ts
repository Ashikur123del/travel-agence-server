export declare const ContactService: {
    createContact(data: {
        name: string;
        phone: string;
        email?: string;
        service?: string;
        message: string;
    }): Promise<{
        id: string;
        name: string;
        phone: string;
        email: string | null;
        service: string | null;
        message: string;
        isRead: boolean;
        createdAt: Date;
    }>;
    getAllContacts(): Promise<{
        id: string;
        name: string;
        phone: string;
        email: string | null;
        service: string | null;
        message: string;
        isRead: boolean;
        createdAt: Date;
    }[]>;
    getContactById(id: string): Promise<{
        id: string;
        name: string;
        phone: string;
        email: string | null;
        service: string | null;
        message: string;
        isRead: boolean;
        createdAt: Date;
    } | null>;
    updateContactStatus(id: string, isRead: boolean): Promise<{
        id: string;
        name: string;
        phone: string;
        email: string | null;
        service: string | null;
        message: string;
        isRead: boolean;
        createdAt: Date;
    }>;
    deleteContact(id: string): Promise<{
        id: string;
        name: string;
        phone: string;
        email: string | null;
        service: string | null;
        message: string;
        isRead: boolean;
        createdAt: Date;
    }>;
};
