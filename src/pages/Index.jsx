import { useState } from 'react';
import { Box, Button, Container, Flex, IconButton, Input, List, ListItem, Text, useToast, VStack } from '@chakra-ui/react';
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const toast = useToast();

  const addTask = () => {
    if (input.trim() === '') {
      toast({
        title: 'No task entered',
        status: 'warning',
        duration: 2000,
        isClosable: true,
      });
      return;
    }
    setTasks([...tasks, { id: Date.now(), text: input }]);
    setInput('');
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const editTask = (id, newText) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: newText } : task));
  };

  return (
    <Container maxW="container.md" p={4}>
      <VStack spacing={4}>
        <Flex as="nav" w="full" justify="space-between" mb={4}>
          <Text fontSize="2xl" fontWeight="bold">Todo App</Text>
        </Flex>
        <Flex as="form" onSubmit={(e) => { e.preventDefault(); addTask(); }}>
          <Input placeholder="Add a new task" value={input} onChange={(e) => setInput(e.target.value)} />
          <IconButton aria-label="Add task" icon={<FaPlus />} onClick={addTask} ml={2} style={{ backgroundColor: '#38A169' }} />
        </Flex>
        <List spacing={3} w="full">
          {tasks.map(task => (
            <ListItem key={task.id} d="flex" justifyContent="space-between" alignItems="center">
              <Text flex="1">{task.text}</Text>
              <IconButton aria-label="Edit task" icon={<FaEdit />} onClick={() => editTask(task.id, prompt('Edit task:', task.text))} />
              <IconButton aria-label="Delete task" icon={<FaTrash />} onClick={() => deleteTask(task.id)} />
            </ListItem>
          ))}
        </List>
      </VStack>
    </Container>
  );
};

export default Index;