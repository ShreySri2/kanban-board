// HomepageContext.tsx
import React, { createContext, useEffect, useState, ReactNode } from "react";
import { GroupingBy, GroupingByContextType, SortBy, SortingByContextType, Ticket, TicketGroup } from "./HomepageContext.types";

export const GroupingByContext = createContext<GroupingByContextType>({
    groupBy: 'status',
    setGroupBy: () => {}
});

export const SortingByContext = createContext<SortingByContextType>({
    sortOrder: 'priority',
    setSortOrder: () => {}
});

export const TicketsContext = createContext<TicketGroup[] | undefined>(undefined);


interface HomepageContextProps {
    children: ReactNode; 
}

const HomepageContext: React.FC<HomepageContextProps> = ({ children }) => {
    const [tickets, setTickets] = useState<Ticket[]>([]);
    const [users, setUsers] = useState()
    const [groupBy, setGroupBy] = useState<GroupingBy>('status');
    const [sortOrder, setSortOrder] = useState<SortBy>('priority');
    const [groupedAndSortedTickets, setGroupedAndSortedTickets] = useState<TicketGroup[] | undefined>(undefined)

    const fetchData = async () => {
        try {
            const response = await fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
            const data = await response.json();
            setTickets(data.tickets);
            setUsers(data.users)
        } catch (err) {
            console.log("error fetching data:", err);
            console.log(users)
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (tickets.length > 0) {
            const sortedAndGrouped = getSortedAndGroupedTickets(tickets);
            setGroupedAndSortedTickets(sortedAndGrouped);
        }
    }, [tickets, groupBy, sortOrder]);


    
    const groupedTickets = (tickets:Ticket[])=>{
        if(groupBy==='status'){
            const groupedTickets: TicketGroup[] = [];
            const uniqueStatuses = Array.from(new Set(tickets.map(ticket => ticket.status)));
        
            uniqueStatuses.forEach(status => {
                const ticketsForStatus = tickets.filter(ticket => ticket.status === status);
                groupedTickets.push({ groupLabel: status, tickets: ticketsForStatus });
            });
        
            return groupedTickets;
        }
        if(groupBy==='priority'){
            const groupedTickets: TicketGroup[] = [];
            const uniquePriorities = Array.from(new Set(tickets.map(ticket => ticket.priority)));
        
            uniquePriorities.forEach(priority => {
                const ticketsForPriority = tickets.filter(ticket => ticket.priority === priority);
                const priorityLabel = priority === 0 ? 'No priority' : `Priority ${priority}`;
                groupedTickets.push({ groupLabel: priorityLabel, tickets: ticketsForPriority });
            });
        
            return groupedTickets;
        }
        if(groupBy==='user'){
            const groupedTickets: TicketGroup[] = [];
            const uniqueUsers = Array.from(new Set(tickets.map(ticket => ticket.userId)));
        
            uniqueUsers.forEach(user => {
                const ticketsForUser = tickets.filter(ticket => ticket.userId === user);
                groupedTickets.push({ groupLabel: user, tickets: ticketsForUser });
            });
        
            return groupedTickets;
        }
        return []
    }
    const sortOrdering = (ticketGroups: TicketGroup[]) =>{
        if(sortOrder==='priority'){
            return ticketGroups.map(group => ({
                groupLabel: group.groupLabel,
                tickets: group.tickets.sort((a, b) => a.title.localeCompare(b.title))
            }));
        }
        if(sortOrder==='title'){
            return ticketGroups.map(group => ({
                groupLabel: group.groupLabel,
                tickets: group.tickets.sort((a, b) => b.priority - a.priority)
            }));
        }
    }
    const getSortedAndGroupedTickets = (tickets:Ticket[]) =>{
        return sortOrdering(groupedTickets(tickets))

    }
    return (
        <GroupingByContext.Provider value={{groupBy, setGroupBy}}>
            <SortingByContext.Provider value={ {sortOrder, setSortOrder}}>
                <TicketsContext.Provider value={groupedAndSortedTickets}>
                    {children}
                </TicketsContext.Provider>
            </SortingByContext.Provider>
        </GroupingByContext.Provider>
    );
};

export default HomepageContext;
