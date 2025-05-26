import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function Profile() {
    // Mock user data - replace with real data later
    const userProfile = {
        name: "John Doe",
        age: 35,
        bloodType: "A+",
        email: "john.doe@email.com",
        phone: "(123) 456-7890"
    };

    const healthInfo = {
        bmi: "24.5",
        bloodPressure: "120/80",
        bloodSugar: "95 mg/dL",
        lastCheckup: "15 May 2024"
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.header}>
                <View style={styles.profileImage}>
                    <Text style={styles.profileInitials}>
                        {userProfile.name.split(' ').map(n => n[0]).join('')}
                    </Text>
                </View>
                <Text style={styles.headerText}>{userProfile.name}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Personal Information</Text>
                <View style={styles.infoContainer}>
                    <InfoItem label="Age" value={userProfile.age} />
                    <InfoItem label="Blood Type" value={userProfile.bloodType} />
                    <InfoItem label="Email" value={userProfile.email} />
                    <InfoItem label="Phone" value={userProfile.phone} />
                </View>
            </View>

            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Health Overview</Text>
                <View style={styles.infoContainer}>
                    <InfoItem label="BMI" value={healthInfo.bmi} />
                    <InfoItem label="Blood Pressure" value={healthInfo.bloodPressure} />
                    <InfoItem label="Blood Sugar" value={healthInfo.bloodSugar} />
                    <InfoItem label="Last Checkup" value={healthInfo.lastCheckup} />
                </View>
            </View>
        </ScrollView>
    );
}

const InfoItem = ({ label, value }) => (
    <View style={styles.infoItem}>
        <Text style={styles.label}>{label}</Text>
        <Text style={styles.value}>{value}</Text>
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1d6ed1',
    },
    header: {
        alignItems: 'center',
        padding: 20,
        paddingTop: 40,
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10
    },
    profileInitials: {
        fontSize: 40,
        color: '#1d6ed1',
        fontWeight: 'bold'
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
    },
    section: {
        backgroundColor: 'rgba(255, 255, 255, 0.9)',
        borderRadius: 15,
        padding: 15,
        margin: 20,
        marginTop: 10,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#1d6ed1',
        marginBottom: 15,
    },
    infoContainer: {
        gap: 10,
    },
    infoItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    label: {
        fontSize: 16,
        color: '#666',
    },
    value: {
        fontSize: 16,
        color: '#333',
        fontWeight: '500',
    }
});