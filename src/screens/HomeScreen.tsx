import React, {useState,useRef, useCallback} from 'react';
import { Dimensions,ImageSourcePropType, ImageBackground} from "react-native";
import { ListRenderItemInfo, StyleSheet, View} from 'react-native';
import { Layout, useTheme,  Button, Card, List, Text } from '@ui-kitten/components';
import { HomePageHorizontalData, HomePageData,HomePageFooterData } from '../data/dataHomeScreen';

interface IlistItem {
    title?: string,
    description?: string,
    content: string,
    image: ImageSourcePropType,
}
interface HeaderlistItem {
    content: string,
}
interface FooterlistItem {
  buttonLabel: string,
}

const screenWidth = Dimensions.get("screen").width-32;
const renderItemImage = (imageSource:ImageSourcePropType): React.ReactElement => 
(
  <ImageBackground
      style={styles.itemImage}
      source={imageSource}
  />
);

const HomeScreen = () => {
  const theme = useTheme();
  const renderItem = (info: ListRenderItemInfo<IlistItem>): React.ReactElement =>{ 
    const {item, index} = info;
    return(
        <Card
          style={styles.item}
          header={() => renderItemImage(item.image)}>
          <Text category='h5'>
            {info.item.title}
          </Text>
          <Text
            style={styles.itemContent}
            appearance='hint'
            category='s1'>
            {`${info.item.content.substring(0, 82)}...`}
          </Text>
        </Card> 
    ); 
  }

  const renderItemHorizontal = (info: ListRenderItemInfo<HeaderlistItem>): React.ReactElement =>{ 
    const {item, index} = info;
    const customStyles = index % 2 == 0? {backgroundColor:theme['color-info-500']}: {backgroundColor:theme['color-basic-600']};
    return(
      <Card style={[styles.itemHorizontal, customStyles]}>
        <Text style={styles.itemContent}
          appearance='alternative'
          category='s1'>
          {info.item.content}
        </Text>
      </Card>   
    ); 
  }
    
  const Pagination = ({index}:{index: number}):React.ReactElement =>{
    return (
      <View style={styles.pagination} pointerEvents="none">
        {HomePageHorizontalData.map((_, i) => {
          return (
            <View
              key={i}
              style={[
                styles.paginationDot,
                index === i
                  ? styles.paginationDotActive
                  : styles.paginationDotInactive,
              ]}
            />
          );
        })}
      </View>
    );
  }

  const renderItemHeaderList= (info: ListRenderItemInfo<HeaderlistItem>): React.ReactElement =>{ 
      const [index, setIndex] = useState(0);
      const indexRef = useRef(index);
      indexRef.current = index;
      const onScroll = useCallback((event:any) => {
          const slideSize = event.nativeEvent.layoutMeasurement.width;
          const index = event.nativeEvent.contentOffset.x / slideSize;
          const roundIndex = Math.round(index);
          const distance = Math.abs(roundIndex - index);
          // Prevent one pixel triggering setIndex in the middle
          // of the transition. With this we have to scroll a bit
          // more to trigger the index change.
          const isNoMansLand = 0.4 < distance;
          if (roundIndex !== indexRef.current && !isNoMansLand) {
            setIndex(roundIndex);
          }
        }, []);
      
      return(
          <React.Fragment>
          <List
            contentContainerStyle={styles.listContentHorizontal}
            pagingEnabled
            horizontal
            showsHorizontalScrollIndicator={false}
            data={HomePageHorizontalData}
            renderItem={renderItemHorizontal}
            onScroll={onScroll}
            bounces={false}
          />
          <Pagination index={index}></Pagination>
          </React.Fragment>
      ); 
  }

  const renderItemFooter = (info: ListRenderItemInfo<FooterlistItem>): React.ReactElement =>{ 
    const {item, index} = info;
    return(
      <View style={styles.buttonContainer}>
        <Button
          style={styles.button}
          size='small'>
         {info.item.buttonLabel}
        </Button> 
      </View>    
    ); 
  }

  const renderItemFooterList = (info:ListRenderItemInfo<FooterlistItem>): React.ReactElement =>{
    return(
      <React.Fragment>
        <List
          data={HomePageFooterData}
          renderItem={renderItemFooter}
        /> 
      </React.Fragment>
    );
  } 
    
  return (
    <Layout style={styles.container} level='3'>
      <View style={styles.welcomeContainer}>
        <Text
            status='basic'
            category='h5'
            >
            Good morning!
        </Text>
        <Button
            appearance='ghost'
            status='primary'
            size='medium'>
            Log in
        </Button> 
      </View>
      <View style={styles.list}>        
          <List
          contentContainerStyle={styles.listContent}
          data={HomePageData}
          renderItem={renderItem}
          ListHeaderComponent={renderItemHeaderList}
          ListFooterComponent={renderItemFooterList}
          />
      </View> 
    </Layout>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container:{
        flex: 1,
    },
    welcomeContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      paddingTop: 10,
      paddingHorizontal: 16,
      justifyContent: 'space-between',
    },
    homepageBanner:{
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 15,
    },
    list: {
        flex: 5,
        maxHeight: 'auto',
      },
    listContent: {
        paddingHorizontal: 16,
        paddingVertical: 8,
      },
    listContentHorizontal: {
        paddingVertical: 0,
      },
    itemHorizontal: {
        borderRadius: 9,
        width: screenWidth, 
        height:120,
        marginRight:8
      },
    item: {
        marginVertical: 8,
        borderRadius: 9,
      },
    itemImage: {
        height: 220,
      },
    itemContent: {
        marginVertical: 8,
      },
    pagination: {
        position: 'absolute',
        bottom: 8,
        width: '100%',
        justifyContent: 'center',
        flexDirection: 'row',
      },
      paginationDot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        marginHorizontal: 2,
      },
      paginationDotActive: { backgroundColor: 'lightblue' },
      paginationDotInactive: { backgroundColor: 'gray' },
      buttonContainer:{
        alignItems:'center'
      },
      button:{
        marginTop: 20,
        marginBottom:80,
        width:150,
        borderRadius:60,
      }
  });