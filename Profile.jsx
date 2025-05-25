import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'expo-charts';

export default function Profile(){
    return (
        <View style={styles.container}></View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d6ed1',
        padding: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
        marginBottom: 20,
        marginTop: 40,
    },
    chartContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
    },
    chartTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1d6ed1',
        marginBottom: 10,
    },
    riskContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1d6ed1',
        marginBottom: 15,
    },
    riskFactors: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    riskItem: {
        alignItems: 'center',
        flex: 1,
    },
    riskLabel: {
        fontSize: 14,
        color: '#666',
        marginBottom: 5,
    },
    riskValue: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#1d6ed1',
    },
    summaryContainer: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
        padding: 15,
        marginBottom: 20,
    },
    summaryBox: {
        backgroundColor: '#f5f5f5',
        borderRadius: 10,
        padding: 15,
    },
    summaryText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 8,
    },
});