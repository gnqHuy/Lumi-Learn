import { View, Text, TouchableHighlight, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'

export type DropdownProps = {
    isError: boolean
    title: string,
    data: string[] | null,
    styling: string | null,
    setSelectedItem: (item: any) => void
}

const DropdownSelection = (props: DropdownProps) => {
    const [ isOpen, setIsOpen ] = useState(false);

    const handleSelect = (item: string) => {
        props.setSelectedItem(item);
        setIsOpen(false);
    }
  return (
    <View className='relative'>
        <TouchableHighlight className={props.styling ?? 
        `w-full py-4 rounded-xl border border-solid
            ${props.isError ? 'border-red-600' : 'border-slate-700'}`}
            onPress={() => setIsOpen(!isOpen)}
            underlayColor="rgba(0, 0, 0, 0.2)"
        >
            <View>
                <View className='flex flex-row px-3 justify-between'>
                    <Text>{props.title}</Text>
                    <Text>▼</Text>
                </View>
            </View>
        </TouchableHighlight>
        {isOpen && (
            <View 
                className="absolute top-14 left-0 w-full z-20 rounded-xl overflow-hidden border border-slate-300"
                pointerEvents='auto'
            >
                <FlatList
                    data={props.data}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item }) => (
                        <TouchableHighlight 
                            onPress={() => handleSelect(item)}
                            underlayColor={"rgba(0,0,0,0.1)"}
                        >
                            <View className="w-full z-20 px-3 py-4 border-b border-b-slate-200">
                                <Text className="text-base color-slate-700">{item}</Text>
                            </View>
                        </TouchableHighlight>
                    )}
                />
            </View>
        )}
    </View>
  )
}

export default DropdownSelection