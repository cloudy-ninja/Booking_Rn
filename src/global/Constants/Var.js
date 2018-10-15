import { Dimensions, Platform } from 'react-native'
const { height, width } = Dimensions.get('window')
const windowDimensions = { height, width }
const mainPadding = width * 0.045
const platform = Platform.OS

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 350
const guidelineBaseHeight = 680

const scale = size => width / guidelineBaseWidth * size
const verticalScale = size => height / guidelineBaseHeight * size
const moderateScale = (size, factor = 0.5) => size + ( scale(size) - size ) * factor

const flex = (direction, align, justify) => ({
  flexDirection: direction,
  alignItems: align,
  justifyContent: justify
})

const fonts = {
  SFrancisco: 'SanFranciscoText-Regular',
  SFDisplay: 'SanFranciscoDisplay-Regular',
  SFProDisplay: 'SFProDisplay-Regular'
}

export {
  scale,
  verticalScale,
  moderateScale,
  windowDimensions,
  mainPadding,
  flex,
  fonts,
  platform
}
