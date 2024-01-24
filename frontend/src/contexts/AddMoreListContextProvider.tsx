import { TaskGroup } from '@/model';
import { useState, createContext, ReactNode } from 'react';

interface AddMoreListContextProps {
    children: ReactNode;
}

interface AddMoreListContextValue {
    listOfTasks: TaskGroup[];
    setListOfTasks: React.Dispatch<React.SetStateAction<TaskGroup[]>>;
}

const AddMoreListContext = createContext<AddMoreListContextValue>({
    listOfTasks: [],
    setListOfTasks: () => {},
});

const AddMoreListContextProvider = ({ children }: AddMoreListContextProps) => {
    const [listOfTasks, setListOfTasks] = useState<TaskGroup[]>([]);

    const contextValue: AddMoreListContextValue = {
        listOfTasks,
        setListOfTasks,
    };

    return (
        <AddMoreListContext.Provider value={contextValue}>
            {children}
        </AddMoreListContext.Provider>
    );
};

export { AddMoreListContext, AddMoreListContextProvider };
