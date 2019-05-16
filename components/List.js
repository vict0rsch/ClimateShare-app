import React from 'react';
import { FlatList, View } from 'react-native';

import Footer from './Footer';
import Item from './Item';

class List extends React.Component {
  renderItem = ({ item }) => <Item {...item} />;
  renderSeparator = () => (
    <View
      style={{
        backgroundColor: 'white',
        height: 10,
      }}
    />
  );
  keyExtractor = item => item.key;
  render() {
    const { onPressFooter, ...props } = this.props;
    return (
      <FlatList
        keyExtractor={this.keyExtractor}
	ItemSeparatorComponent={this.renderSeparator}
        ListFooterComponent={footerProps => (
          <Footer {...footerProps} onPress={onPressFooter} />
        )}
        renderItem={this.renderItem}
        {...props}
      />
    );
  }
}
export default List;
