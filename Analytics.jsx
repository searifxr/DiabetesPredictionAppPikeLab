import React from 'react';
import { StyleSheet, Text, View, ScrollView, Dimensions } from 'react-native';
import { BarChart } from 'expo-charts';

export default function Analytics() {
    const data = [
        { value: 85, label: 'Mon' },
        { value: 92, label: 'Tue' },
        { value: 88, label: 'Wed' },
        { value: 95, label: 'Thu' },
        { value: 87, label: 'Fri' },
        { value: 90, label: 'Sat' },
        { value: 89, label: 'Sun' },
    ];

    return (
        <View style={styles.container}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.headerText}>Your Health Analytics</Text>

                <View style={styles.chartContainer}>
                    <Text style={styles.chartTitle}>Blood Sugar Trends</Text>
                    <BarChart
                        data={data}
                        width={Dimensions.get('window').width - 40}
                        height={220}
                        chartConfig={{
                            backgroundColor: '#1d6ed1',
                            color: (opacity = 1) => `rgba(255, 167, 38, ${opacity})`,
                        }}
                        style={{
                            marginVertical: 8,
                            borderRadius: 16
                        }}
                    />
                </View>

                
                <View style={styles.riskContainer}>
                    <Text style={styles.sectionTitle}>Risk Factor Analysis</Text>
                    <View style={styles.riskFactors}>
                        <View style={styles.riskItem}>
                            <Text style={styles.riskLabel}>BMI Status</Text>
                            <Text style={styles.riskValue}>Normal</Text>
                        </View>
                        <View style={styles.riskItem}>
                            <Text style={styles.riskLabel}>Blood Pressure</Text>
                            <Text style={styles.riskValue}>Elevated</Text>
                        </View>
                        <View style={styles.riskItem}>
                            <Text style={styles.riskLabel}>Family History</Text>
                            <Text style={styles.riskValue}>High Risk</Text>
                        </View>
                    </View>
                </View>

            
                <View style={styles.summaryContainer}>
                    <Text style={styles.sectionTitle}>Monthly Summary</Text>
                    <View style={styles.summaryBox}>
                        <Text style={styles.summaryText}>Average Blood Sugar: 89 mg/dL</Text>
                        <Text style={styles.summaryText}>Highest Reading: 95 mg/dL</Text>
                        <Text style={styles.summaryText}>Lowest Reading: 85 mg/dL</Text>
                        <Text style={styles.summaryText}>Tests Taken: 30</Text>
                    </View>
                </View>
            </ScrollView>
        </View>
    );
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