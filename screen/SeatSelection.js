import React, { useState } from 'react';
import {View,Text,TouchableOpacity,StyleSheet,ScrollView,} from 'react-native';

const SeatSelection = () => {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.plane}>
          <View style={styles.fuselage}>
            {Array.from({ length: 10 }, (_, index) => (
              <View key={index} style={styles.row}>
                <View style={styles.seats}>
                  {['A', 'B', 'C', 'D', 'E', 'F'].map((seat, seatIndex) => (
                    <TouchableOpacity
                      key={seatIndex}
                      style={seatIndex === 2 ? [styles.seat, { marginRight: 40 }] : styles.seat}
                    >
                      <Text style={styles.seatLabel}>{`${index + 1}${seat}`}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    );
  };

  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      padding: 21,
    },
    plane: {
      flex: 1,
    },
    fuselage: {
        marginTop: 60,
    },
    row: {
      flexDirection: 'row',
    },
    seats: {
      flex: 1,
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'flex-start',
    },
    seat: {
      flex: 0,
      width: '13.5%',
      height: '80%',
      padding: 5,
      margin: 2,
      backgroundColor: '#F42536',
      borderRadius: 5,
    },
    seatLabel: {
      width: '100%',
      textAlign: 'center',
      fontSize: 12,
      fontWeight: 'bold',
      lineHeight: 24,
      padding: 5,
      backgroundColor: '#F42536',
      borderRadius: 5,
      overflow: 'hidden',
    },
  });

export default SeatSelection;
