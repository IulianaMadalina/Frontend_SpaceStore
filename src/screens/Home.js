import React from 'react';
import { View, Text, FlatList, StatusBar } from 'react-native';

export default class Home extends React.Component {
    constructor(props) {
        super();
        this.state = {
            products: [],
            isFetching: false,
        }
    }

    componentDidMount() {

    }

    getAllProducts() {
        this.setState({ isFetching: true }, () => {
            api.post('getAllProducts', {}
                .then(response => {
                    console.log('response products: ', response);
                    this.setState({ products: response.data });
                }))
        })
    }

    render() {
        return (
            <>
                <StatusBar animated backgroundColor='#fff' barStyle={'dark-content'} />
                <FlatList
                    contentContainerStyle={{ flex: 1, backgroundColor: '#fff' }}
                    data={this.state.products}
                    keyExtractor={(item, index) => 'produs-' + index.toString()}
                    renderItem={product => {
                        return (
                            <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                                <View style={{ width: 50, height: 50 }} />
                                <Text style={{ fontSize: 15, fontWeight: 'bold' }}>{product.item.name}</Text>
                                <Text style={{ fontSize: 13 }}>{product.item.descriere}</Text>
                            </View>
                        )
                    }}
                    onRefresh={() => this.onRefresh()}
                    refreshing={this.state.isFetching}
                    numColumns={2}
                />
            </>
        )
    }
}