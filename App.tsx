import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// Các màn hình đã import
import { HomeScreen } from './screens/HomeScreen';
import { BookDetailScreen } from './screens/BookDetailScreen';
import { CartScreen } from './screens/CartScreen';

// Các component chung
import { TabBar, TabKey } from './components/TabBar';

// Dữ liệu giả lập
import { BOOKS, CART_ITEMS } from './data';

export default function App() {
  const [activeTab, setActiveTab] = useState<TabKey>('home');
  const [selectedBookId, setSelectedBookId] = useState<number | null>(null);

  const selectedBook = selectedBookId ? BOOKS.find(b => b.id === selectedBookId) : null;

  return (
    <SafeAreaView style={styles.root}>
      <View style={styles.body}>
        
        {selectedBook ? (
          <BookDetailScreen 
            book={selectedBook}
            onBack={() => setSelectedBookId(null)}
            onAddToCart={() => {
              setSelectedBookId(null);
              setActiveTab('cart'); 
            }}
          />
        ) : activeTab === 'home' ? (

          <View style={styles.homeWrapper}>
            <HomeScreen 
              cartCount={CART_ITEMS.length}
              onPressBook={(id) => setSelectedBookId(id)}
              onPressCart={() => setActiveTab('cart')}
            />
          </View>
        ) : activeTab === 'cart' ? (
          <CartScreen items={CART_ITEMS} />
        ) : (
          <Placeholder tab={activeTab} />
        )}

        {!selectedBook && (
          <TabBar active={activeTab} onChange={setActiveTab} />
        )}
        
      </View>
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}

function Placeholder({ tab }: { tab: TabKey }) {
  const note: Record<TabKey, string> = {
    home: '',
    category: 'Nội dung tab "Danh mục" thuộc Giờ 2 — xem project bookstore-online-gio2.',
    cart: '',
    account: 'Tài liệu gốc không mô tả tab này, để trống.',
  };
  
  return (
    <View style={styles.placeholder}>
      <Text style={styles.placeholderText}>{note[tab]}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { 
    flex: 1, 
    backgroundColor: '#FFFFFF' 
  },
  body: { 
    flex: 1,
  },
  // Thêm style cho wrapper của Home
  homeWrapper: {
    flex: 1,
    paddingBottom: 64, // Trừ đi khoảng không gian 64px của TabBar
  },
  placeholder: { 
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    padding: 24 
  },
  placeholderText: { 
    textAlign: 'center', 
    color: '#5B6B7F' 
  },
});