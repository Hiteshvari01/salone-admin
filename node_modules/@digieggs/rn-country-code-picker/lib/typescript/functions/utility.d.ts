import React from 'react';
import { View } from 'react-native';
import { ICountry, IItemMeasure } from '../types';
export declare function onLayoutToggle(ref: React.RefObject<View>, callback: (measure: IItemMeasure) => void): Promise<void>;
export declare function sortData(countries: Array<ICountry>, searchValue: string): ICountry[];
