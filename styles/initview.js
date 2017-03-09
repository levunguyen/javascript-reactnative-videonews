'use strict';

import React, { Component } from 'react';
import {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({

  row: {
    flexDirection: 'row',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#F6F6F6',
  },

  thumb: {
    width: 64,
    height: 64
  },

  text: {
    flex: 1,
    padding: 10
  },

  sperator: {
    height: 1,
    flex: 1,
    backgroundColor: '#CCCCCC',
  },

  title: {
    fontSize: 10,
    fontWeight: 'bold'
  },

  description: {
    fontFamily: 'Cochin',
    fontSize: 8
  },
  button: {
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30
  }
});
