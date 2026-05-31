/**
 * React Native / Expo example
 *
 * Note: No SSR in React Native — the client-side QueryClient singleton is
 * used automatically. AsyncStorage is used for auth token persistence.
 *
 * Dependencies:
 *   npx expo install @structyl/api-client @tanstack/react-query axios
 *   npx expo install @react-native-async-storage/async-storage
 */
import React from 'react';
import { FlatList, Text, TouchableOpacity, View, StyleSheet } from 'react-native';
import {
  createApiClient,
  ApiProvider,
  useApiQuery,
  useApiMutation,
} from '@structyl/api-client';

const api = createApiClient({
  baseURL: 'https://jsonplaceholder.typicode.com',
  // AsyncStorage-based token retrieval on mobile
  getAuthToken: async () => {
    // Replace with: return AsyncStorage.getItem('token');
    return null;
  },
});

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function TodoScreen() {
  const { data, isLoading, error } = useApiQuery<Todo[]>('/todos?_limit=10');
  const { mutate, isPending } = useApiMutation<Todo, { title: string }>('/todos', {
    method: 'POST',
    invalidates: [['/todos?_limit=10']],
  });

  if (isLoading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error.message}</Text>;

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Text style={[styles.item, item.completed && styles.completed]}>
            {item.title}
          </Text>
        )}
      />
      <TouchableOpacity
        style={[styles.button, isPending && styles.buttonDisabled]}
        disabled={isPending}
        onPress={() => mutate({ title: 'New task' })}
      >
        <Text style={styles.buttonText}>
          {isPending ? 'Adding...' : 'Add Task'}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default function App() {
  return (
    <ApiProvider client={api}>
      <TodoScreen />
    </ApiProvider>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 48 },
  item: { paddingVertical: 8, fontSize: 16 },
  completed: { textDecorationLine: 'line-through', color: '#999' },
  button: {
    marginTop: 16,
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonDisabled: { opacity: 0.5 },
  buttonText: { color: '#fff', fontWeight: '600' },
});
