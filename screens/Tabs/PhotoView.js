import React, {useState} from 'react';
import styled from "styled-components";
import constants from "../../constants";
import ImageViewer from 'react-native-image-zoom-viewer';
import NavIcon from '../../components/NavIcon';

const Touchable = styled.TouchableOpacity `
background-color:white;
`;
const IconContainer = styled.View `
    padding-left:15px;
    padding-right:15px;
`;

const View = styled.View `
    height:${constants.height};
    flex:1;
    background-color:black;
`;

const Container = styled.View `
flex: 1;
justify-content:center;
`;
const Text = styled.Text ``;

const PhotoView = ({navigation}) => {
    // console.log((constants.height / 2) - 40);
    var files = navigation.getParam("files");
    var file = navigation.getParam("file");
    files = files === undefined ? [{url:file}] : files;
    var idx = navigation.getParam("idx");
    idx = idx === undefined ? 0 : idx;
    return (
        <View>
            <ImageViewer
                imageUrls={files}
                index={idx}
                renderHeader={() => {
                    <Touchable
                        onPress={() => {
                            navigation.goBack(null)
                        }}>
                        <IconContainer>
                            <NavIcon
                                type={"Ionicons"}
                                name={"ios-arrow-back"}
                                size={30}
                                style={{
                                    color: "#fff"
                                }}/>
                        </IconContainer>
                    </Touchable>
                }}/>
        </View>
    );
}

export default PhotoView;