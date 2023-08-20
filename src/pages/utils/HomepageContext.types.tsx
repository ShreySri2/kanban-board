export type GroupingBy = 'status' | 'user' | 'priority'

export type SortBy = 'priority' | 'title'

export interface Ticket {
    id: string;
    title: string;
    tag: string[];
    userId: string;
    status: string;
    priority: number;
}

// Define the context type
export interface GroupingByContextType {
    groupBy: GroupingBy;
    setGroupBy: React.Dispatch<React.SetStateAction<GroupingBy>>;
}
export interface SortingByContextType{
    sortOrder: SortBy;
    setSortOrder: React.Dispatch<React.SetStateAction<SortBy>>;
    
}
export interface TicketsContext{
    tickets: Ticket[];
}
export interface TicketGroup {
    groupLabel: string;
    tickets: Ticket[];
}
