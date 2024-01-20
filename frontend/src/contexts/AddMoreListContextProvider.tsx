import { useState, createContext, ReactNode } from 'react';

interface AddMoreListContextProps {
    children: ReactNode;
}

interface AddMoreListContextValue {
    listOfTasks: string[];
    setListOfTasks: React.Dispatch<React.SetStateAction<string[]>>;
}

const AddMoreListContext = createContext<AddMoreListContextValue>({
    listOfTasks: [],
    setListOfTasks: () => {},
});

const AddMoreListContextProvider = ({ children }: AddMoreListContextProps) => {
    const [listOfTasks, setListOfTasks] = useState<string[]>([]);

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
