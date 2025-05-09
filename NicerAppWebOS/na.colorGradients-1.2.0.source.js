// Copyright (c)/(C) 2002-2025 and All Rights Reserved (r)/(R) by Rene AJM Veerman <rene.veerman.netherlands@gmail.com>
var naCG = nicerapp.colorGradients = nicerapp.cg = na.colorGradients = {
	about : {
		whatsThis : 
			'nicerapp.colorGradients = nicerapp.cg = na.colorGradients = naCG = '
			+'A component used to calculate HTML color gradients from a theme definition',
		copyright : '(c)/(C) and (r)/(R) 2012-2024 by Rene AJM Veerman, Amsterdam, Netherlands, rene.veerman.netherlands@gmail.com',
		license : 'http://nicer.app/LICENSE.txt',
		disclaimer : 'NO WARRANTY EXPRESSED OR IMPLIED. USE ONLY AT YOUR OWN RISK.',
		version : '1.2.0',
		firstReleased : '2012 August 31, 10:37 CEST',
		lastUpdated : '2023 Dec 31st, 00:13 CET',
        history : {
            '1.0.0' : 'supporting themes with hex or color name values only',
            '1.1.0' : '2021-08-19: now supports rgb(...) and rgba(....) values as well',
            '1.2.z' : 'modifications to make it work with the latest versions of NicerAppWebOS'
        },
		downloadURL : 'http://nicer.app/'
	},
	
	globals : {
		colorList: {
			// thanks http://www.w3schools.com/css/css_colornames.asp
			AliceBlue: "#F0F8FF", AntiqueWhite: "#FAEBD7", Aqua: "#00FFFF", Aquamarine: "#7FFFD4", Azure: "#F0FFFF", Beige: "#F5F5DC",
			Bisque: "#FFE4C4", Black: "#000000", BlanchedAlmond: "#FFEBCD", Blue: "#0000FF", BlueViolet: "#8A2BE2", Brown: "#A52A2A",
			BurlyWood: "#DEB887", CadetBlue: "#5F9EA0", Chartreuse: "#7FFF00", Chocolate: "#D2691E", Coral: "#FF7F50", CornflowerBlue: "#6495ED",
			Cornsilk: "#FFF8DC", Crimson: "#DC143C", Cyan: "#00FFFF", DarkBlue: "#00008B", DarkCyan: "#008B8B", DarkGoldenRod: "#B8860B",
			DarkGray: "#A9A9A9", DarkGreen: "#006400", DarkKhaki: "#BDB76B", DarkMagenta: "#8B008B", DarkOliveGreen: "#556B2F", DarkOrange: "#FF8C00",
			DarkOrchid: "#9932CC", DarkRed: "#8B0000", DarkSalmon: "#E9967A", DarkSeaGreen: "#8FBC8F", DarkSlateBlue: "#483D8B", DarkSlateGray: "#2F4F4F",
			DarkTurquoise: "#00CED1", DarkViolet: "#9400D3", DeepPink: "#FF1493", DeepSkyBlue: "#00BFFF", DimGray: "#696969", DodgerBlue: "#1E90FF",
			FireBrick: "#B22222", FloralWhite: "#FFFAF0", ForestGreen: "#228B22", Fuchsia: "#FF00FF", Gainsboro: "#DCDCDC", GhostWhite: "#F8F8FF",
			Gold: "#FFD700", GoldenRod: "#DAA520", Gray: "#808080", Green: "#008000", GreenYellow: "#ADFF2F", HoneyDew: "#F0FFF0", HotPink: "#FF69B4",
			IndianRed: "#CD5C5C", Indigo: "#4B0082", Ivory: "#FFFFF0", Khaki: "#F0E68C", Lavender: "#E6E6FA", LavenderBlush: "#FFF0F5",
			LawnGreen: "#7CFC00", LemonChiffon: "#FFFACD", LightBlue: "#ADD8E6", LightCoral: "#F08080", LightCyan: "#E0FFFF", LightGoldenRodYellow: "#FAFAD2",
			LightGrey: "#D3D3D3", LightGreen: "#90EE90", LightPink: "#FFB6C1", LightSalmon: "#FFA07A", LightSeaGreen: "#20B2AA", LightSkyBlue: "#87CEFA",
			LightSlateGray: "#778899", LightSteelBlue: "#B0C4DE", LightYellow: "#FFFFE0", Lime: "#00FF00", LimeGreen: "#32CD32", Linen: "#FAF0E6",
			Magenta: "#FF00FF", Maroon: "#800000", MediumAquaMarine: "#66CDAA", MediumBlue: "#0000CD", MediumOrchid: "#BA55D3", MediumPurple: "#9370D8",
			MediumSeaGreen: "#3CB371", MediumSlateBlue: "#7B68EE", MediumSpringGreen: "#00FA9A", MediumTurquoise: "#48D1CC", MediumVioletRed: "#C71585",
			MidnightBlue: "#191970", MintCream: "#F5FFFA", MistyRose: "#FFE4E1", Moccasin: "#FFE4B5", NavajoWhite: "#FFDEAD", Navy: "#000080",
			OldLace: "#FDF5E6", Olive: "#808000", OliveDrab: "#6B8E23", Orange: "#FFA500", OrangeRed: "#FF4500", Orchid: "#DA70D6", PaleGoldenRod: "#EEE8AA",
			PaleGreen: "#98FB98", PaleTurquoise: "#AFEEEE", PaleVioletRed: "#D87093", PapayaWhip: "#FFEFD5", PeachPuff: "#FFDAB9", Peru: "#CD853F",
			Pink: "#FFC0CB", Plum: "#DDA0DD", PowderBlue: "#B0E0E6", Purple: "#800080", Red: "#FF0000", RosyBrown: "#BC8F8F", RoyalBlue: "#4169E1",
			SaddleBrown: "#8B4513", Salmon: "#FA8072", SandyBrown: "#F4A460", SeaGreen: "#2E8B57", SeaShell: "#FFF5EE", Sienna: "#A0522D",
			Silver: "#C0C0C0", SkyBlue: "#87CEEB", SlateBlue: "#6A5ACD", SlateGray: "#708090", Snow: "#FFFAFA", SpringGreen: "#00FF7F",
			SteelBlue: "#4682B4", Tan: "#D2B48C", Teal: "#008080", Thistle: "#D8BFD8", Tomato: "#FF6347", Turquoise: "#40E0D0", Violet: "#EE82EE",
			Wheat: "#F5DEB3", White: "#FFFFFF", WhiteSmoke: "#F5F5F5", Yellow: "#FFFF00", YellowGreen: "#9ACD32"
		}
	}
};

naCG.themes = {
        
		naColorgradientScheme_btnAdd: {
			themeName: 'naColorgradientScheme_btnAdd',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					// This sets "stops" for color gradients. 
					//	   0 = outer level of display, 
					//	 100 = deepest level of display.
					0: {
						background: '#006655',
						color: 'white'
					},
					100: {
						background: '#000000',
						color: 'lime'
					}
					//Rules:4
					// 1: only css COLOR properties allowed here.
					// 		color names allowed, for a list see http://www.w3schools.com/css/css_colornames.asp
					// 2: properties used anywhere in a list like this must be present in both 0: and 100:
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			// this is the line "Level X, with Y children : tag | tag | ....
			jQueryScrollTo: {
				duration: 900
			}
		},
        
		naColorgradientScheme_btnDelete: {
			themeName: 'naColorgradientScheme_btnDelete',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					// This sets "stops" for color gradients. 
					//	   0 = outer level of display, 
					//	 100 = deepest level of display.
					0: {
						background: '#006655',
						color: '#FF7777'
					},
					100: {
						background: '#000000',
						color: 'lime'
					}
					//Rules:4
					// 1: only css COLOR properties allowed here.
					// 		color names allowed, for a list see http://www.w3schools.com/css/css_colornames.asp
					// 2: properties used anywhere in a list like this must be present in both 0: and 100:
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			// this is the line "Level X, with Y children : tag | tag | ....
			jQueryScrollTo: {
				duration: 900
			}
		},
        
		naColorgradientScheme_btnRename_forumCategory: {
			themeName: 'naColorgradientScheme_btnRename_forumCategory',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					// This sets "stops" for color gradients. 
					//	   0 = outer level of display, 
					//	 100 = deepest level of display.
					0: {
						background: '#006655',
						color: '#ebe834'
					},
					100: {
						background: '#000000',
						color: 'lime'
					}
					//Rules:4
					// 1: only css COLOR properties allowed here.
					// 		color names allowed, for a list see http://www.w3schools.com/css/css_colornames.asp
					// 2: properties used anywhere in a list like this must be present in both 0: and 100:
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			// this is the line "Level X, with Y children : tag | tag | ....
			jQueryScrollTo: {
				duration: 900
			}
		},
        
		naColorgradientScheme_btnRename_forum: {
			themeName: 'naColorgradientScheme_btnRename_forum',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					// This sets "stops" for color gradients. 
					//	   0 = outer level of display, 
					//	 100 = deepest level of display.
					0: {
						background: '#006655',
						color: '#00ddff'
					},
					100: {
						background: '#000000',
						color: 'lime'
					}
					//Rules:4
					// 1: only css COLOR properties allowed here.
					// 		color names allowed, for a list see http://www.w3schools.com/css/css_colornames.asp
					// 2: properties used anywhere in a list like this must be present in both 0: and 100:
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			// this is the line "Level X, with Y children : tag | tag | ....
			jQueryScrollTo: {
				duration: 900
			}
		},
        
        
		naColorgradientSchemeOrangeYellow: {
			themeName: 'naColorgradientSchemeOrangeYellow',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					// This sets "stops" for color gradients. 
					//	   0 = outer level of display, 
					//	 100 = deepest level of display.
					0: {
						color: 'orange'
					},
					100: {
						color: 'yellow'
					}
					//Rules:
					// 1: only css COLOR properties allowed here.
					// 		color names allowed, for a list see http://www.w3schools.com/css/css_colornames.asp
					// 2: properties used anywhere in a list like this must be present in both 0: and 100:
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			// this is the line "Level X, with Y children : tag | tag | ....
			jQueryScrollTo: {
				duration: 900
			}
		}, 

		naColorgradientSchemeMagicalBlue: {
			themeName: 'naColorgradientSchemeMagicalBlue ',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					// This sets "stops" for color gradients. 
					//	   0 = outer level of display, 
					//	 100 = deepest level of display.
					0: {
						background : 'rgba(0,0,255,0.2)',
						color: '#00FFFF'
					},
					100: {
						background : 'rgba(0,0,150,0.4)',
						color: '#fbff21'
					}
					//Rules:
					// 1: only css COLOR properties allowed here.
					// 		color names allowed, for a list see http://www.w3schools.com/css/css_colornames.asp
					// 2: properties used anywhere in a list like this must be present in both 0: and 100:
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			// this is the line "Level X, with Y children : tag | tag | ....
			jQueryScrollTo: {
				duration: 900
			}
		}, 

        naColorgradientScheme_BlueToNavy: {
			themeName: 'naColorgradientScheme_BlueToNavy',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					// This sets "stops" for color gradients.
					//	   0 = outer level of display,
					//	 100 = deepest level of display.
					0: {
                        opacity : 1,
						color: '#0000FF'
					},
					50: {
                        opacity : 1,
						color: '#000020'
					},
                    100 : {
                        color : '#0000FF',
                        opacity : 1
                    }
					//Rules:
					// 1: only css COLOR properties allowed here.
					// 		color names allowed, for a list see http://www.w3schools.com/css/css_colornames.asp
					// 2: properties used anywhere in a list like this must be present in both 0: and 100:
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			// this is the line "Level X, with Y children : tag | tag | ....
			jQueryScrollTo: {
				duration: 900
			}
		},

        naColorgradientScheme_GreenWhiteBlue_classics: {
			themeName: 'naColorgradientScheme_GreenWhiteBlue_classics',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					// This sets "stops" for color gradients.
					//	   0 = outer level of display,
					//	 100 = deepest level of display.
					0: {
                        opacity : 1,
						color: naCG.globals.colorList.GreenYellow
					},
					50: {
                        opacity : 1,
						color: naCG.globals.colorList.AntiqueWhite
					},
                    100 : {
						opacity : 1,
						color : naCG.globals.colorList.GreenYellow
                    }
					//Rules:
					// 1: only css COLOR properties allowed here.
					// 		color names allowed, for a list see http://www.w3schools.com/css/css_colornames.asp
					// 2: properties used anywhere in a list like this must be present in both 0: and 100:
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			// this is the line "Level X, with Y children : tag | tag | ....
			jQueryScrollTo: {
				duration: 900
			}
		},

        naColorgradientScheme_BlueToNavy: {
			themeName: 'naColorgradientScheme_BlueToNavy',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					// This sets "stops" for color gradients. 
					//	   0 = outer level of display, 
					//	 100 = deepest level of display.
					0: {
                        opacity : 1,
						color: '#0000FF'
					},
					50: {
                        opacity : 1,
						color: '#000020'
					},
                    100 : { 
                        color : '#0000FF',
                        opacity : 1
                    }
					//Rules:
					// 1: only css COLOR properties allowed here.
					// 		color names allowed, for a list see http://www.w3schools.com/css/css_colornames.asp
					// 2: properties used anywhere in a list like this must be present in both 0: and 100:
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			// this is the line "Level X, with Y children : tag | tag | ....
			jQueryScrollTo: {
				duration: 900
			}
		},


		naColorgradientScheme_BlueToNavyBG_white: {
			themeName: 'naColorgradientScheme_BlueToNavyBG_white',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					// This sets "stops" for color gradients. 
					//	   0 = outer level of display, 
					//	 100 = deepest level of display.
					0: {
						background: 'rgba(0,0,255,0.1)',
                        opacity : 1,
						color: 'white'
					},
                    100 : { 
                        background : 'rgba(0,0,50,0.20)',
                        color : 'grey',
                        opacity : 1
                    }
					//Rules:
					// 1: only css COLOR properties allowed here.
					// 		color names allowed, for a list see http://www.w3schools.com/css/css_colornames.asp
					// 2: properties used anywhere in a list like this must be present in both 0: and 100:
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			// this is the line "Level X, with Y children : tag | tag | ....
			jQueryScrollTo: {
				duration: 900
			}
		},

        
		naColorgradientScheme_WhiteBG_GreenToBrownToBlueToNavyToBlack: {
			themeName: 'naColorgradientScheme_WhiteBG_GreenToBrownToBlueToNavyToBlack',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					// This sets "stops" for color gradients. 
					//	   0 = outer level of display, 
					//	 100 = deepest level of display.
					0: {
						background: 'white',
						color: 'green'
					},
                    25 : { color : 'brown' },
                    50 : { color : 'blue' },
                    75 : { color : 'navy' },
					100: { color: 'black' }
					//Rules:
					// 1: only css COLOR properties allowed here.
					// 		color names allowed, for a list see http://www.w3schools.com/css/css_colornames.asp
					// 2: properties used anywhere in a list like this must be present in both 0: and 100:
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			// this is the line "Level X, with Y children : tag | tag | ....
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientScheme_OrangeYellow: {
			themeName: 'naColorgradientScheme_OrangeYellow',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					// This sets "stops" for color gradients. 
					//	   0 = outer level of display, 
					//	 100 = deepest level of display.
					0: {
						background: 'black',
						color: 'orange'
					},
					100: {
						background: 'black',
						color: 'yellow'
					}
					//Rules:
					// 1: only css COLOR properties allowed here.
					// 		color names allowed, for a list see http://www.w3schools.com/css/css_colornames.asp
					// 2: properties used anywhere in a list like this must be present in both 0: and 100:
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			// this is the line "Level X, with Y children : tag | tag | ....
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientScheme_OrangeYellow_netherlands: {
			themeName: 'naColorgradientScheme_OrangeYellow_netherlands',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					// This sets "stops" for color gradients. 
					//	   0 = outer level of display, 
					//	 100 = deepest level of display.
					0: {
						background: 'black',
						color: 'DarkOrange'
					},
					100: {
						background: 'black',
						color: 'yellow'
					}
					//Rules:
					// 1: only css COLOR properties allowed here.
					// 		color names allowed, for a list see http://www.w3schools.com/css/css_colornames.asp
					// 2: properties used anywhere in a list like this must be present in both 0: and 100:
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			// this is the line "Level X, with Y children : tag | tag | ....
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientScheme_Dutch_flag : {
			themeName: 'naColorgradientScheme_Dutch_flag',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					// This sets "stops" for color gradients.
					//	   0 = outer level of display,
					//	 100 = deepest level of display.
					0: {
						background: 'black',
						color: 'blue'
					},
					40 : {
						background : 'black',
						color : 'white'
					},
					60 : {
						background : 'black',
						color : 'white'
					},
					100: {
						background: 'black',
						color: 'red'
					}
					//Rules:
					// 1: only css COLOR properties allowed here.
					// 		color names allowed, for a list see http://www.w3schools.com/css/css_colornames.asp
					// 2: properties used anywhere in a list like this must be present in both 0: and 100:
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			// this is the line "Level X, with Y children : tag | tag | ....
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientSchemeGreen: {
			themeName: 'naColorgradientSchemeGreen',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					// This sets "stops" for color gradients. 
					//	   0 = outer level of display, 
					//	 100 = deepest level of display.
					0: {
						background: 'rgba(0,150,130,0.1)',
						color: '#FFFFFF'
					},
					100: {
						background: 'rgba(0,50,50,0.20)',
						color: 'lime'
					}
					//Rules:4
					// 1: only css COLOR properties allowed here.
					// 		color names allowed, for a list see http://www.w3schools.com/css/css_colornames.asp
					// 2: properties used anywhere in a list like this must be present in both 0: and 100:
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			// this is the line "Level X, with Y children : tag | tag | ....
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientSchemeGreen2: {
			themeName: 'naColorgradientSchemeGreen2',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorLevels: {
					0: {
						background: '#055304',
						color: '#0d3473'
					},
					50 : {
						background : 'black',
						color : 'white'
					},
					100: {
						background: '#0d3473',
						color: '#055304'
					}
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientSchemeGreen_leaf : {
			themeName: 'naColorgradientSchemeGreen_leaf',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorLevels: {
					0: {
						//background: '#1AFF00',
						color: '#0C7800'
					},
					50: {
						//background: '#CFFFC9',
						color: '#00FF00'
					},
					100: {
						//background: '#1AFF00',
						color: '#0C7800'
					},
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientSchemeIce: {
			themeName: 'naColorgradientSchemeIce',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					0: {
						background: 'navy',
						color: 'white'
					},
					50: {
						color : 'black'
					},
					100: {
						background: 'white',
						color: 'navy'
					}
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: false,
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientSchemeRed: {
			themeName: 'naColorgradientSchemeRed',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					0: {
						background: '#200000',
						color: '#ff0000'
					},
					100: {
						background: 'red',
						color: 'white'
					}
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientSchemeRed2: {
			themeName: 'naColorgradientSchemeRed2',
			cssGeneration: {
				colorTitle : '#FF0000',
				colorLegend : 'goldenrod',
				colorLegendHREF : 'yellow',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					0: {
						background: '#590000',
						color: '#ffffff'
					},
					100: {
						background: '#ff530f',
						color: 'yellow'
					}
				}
			},
			htmlTopLevelTableProps: 'cellspacing="5"',
			htmlSubLevelTableProps: 'cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientSchemeWhiteToNavy: {
			themeName: 'naColorgradientSchemeWhiteToNavy',
			cssGeneration: {
				colorTitle : 'navy',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'brown',
				colorLevels: {
					// This sets "stops" for color gradients. 
					//	   0 = outer level of display, 
					//	 100 = deepest level of display.
					0: {
						background: '#FFFFFF',
						color: '#00008e'
					},
					40 : {
						color : 'green'
					},
					100: {
						background: '#00008e',
						color: '#FFFFFF'
					}
					//Rules:
					// 1: only css COLOR properties allowed here.
					// 		color names allowed, for a list see http://www.w3schools.com/css/css_colornames.asp
					// 2: properties used anywhere in a list like this must be present in both 0: and 100:
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			// this is the line "Level X, with Y children : tag | tag | ....
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientSchemeWhiteToBrown: {
			themeName: 'naColorgradientSchemeWhiteToBrown',
			cssGeneration: {
				colorTitle : 'red',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'brown',
				colorLevels: {
					// This sets "stops" for color gradients. 
					//	   0 = outer level of display, 
					//	 100 = deepest level of display.
					0: {
						background: '#FFFFFF',
						color: '#8c520e'
					},
					100: {
						background: '#8c520e',
						color: '#FFFFFF'
					}
					//Rules:
					// 1: only css COLOR properties allowed here.
					// 		color names allowed, for a list see http://www.w3schools.com/css/css_colornames.asp
					// 2: properties used anywhere in a list like this must be present in both 0: and 100:
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			// this is the line "Level X, with Y children : tag | tag | ....
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientSchemeDarkRed: {
			themeName: 'naColorgradientSchemeDarkRed',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					0: {
						color: '#200000'
					},
					50: {
						color: '#FF0000'
					},
					100: {
						color: '#200000'
					}
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			jQueryScrollTo: {
				duration: 900
			}
		},
        naColorgradientSchemeBlueVividText: {
			themeName: 'naColorgradientSchemeBlueVividText',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					0: {
						color: '#0000FF'
					},
					100: {
						color: '#AAAAFF'
					}
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			jQueryScrollTo: {
				duration: 900
			}
		},
        
        naColorgradientSchemeGreenVividText: {
			themeName: 'naColorgradientSchemeGreenVividText',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					0: {
						color: '#91FC6D'
					},
					100: {
						color: '#40C215'
					}
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			jQueryScrollTo: {
				duration: 900
			}
		},
        naColorgradientSchemeGreenVividText2: {
			themeName: 'naColorgradientSchemeGreenVividText2',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					0: {
						color: '#91FC6D'
					},
					50 : {
						color : 'cyan'

					},
					100: {
						color: '#40C215'
					}
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			jQueryScrollTo: {
				duration: 900
			}
		},
        naColorgradientSchemeYellowVividText: {
			themeName: 'naColorgradientSchemeYellowVividText',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					0: {
						color: 'FFE342'
					},
					100: {
						color: 'yellow'
					}
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientSchemeDarkRedVividText: {
			themeName: 'naColorgradientSchemeDarkRedVividText',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					0: {
						color: 'darkred'
					},
					100: {
						color: 'red'
					}
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientSchemeYellow_forTrace : {
			themeName: 'naColorgradientSchemeYellow',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					0: {
						background: 'rgba(255,255,100,0.2)',
						color: '#0600B3'
					},
					40: {
						color: 'darkred'
					},
					100: {
						background: 'rgba(255,255,255,0.4)',
						color: '#67008C'
					}
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: true,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: false,
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientSchemeYellow: {
			themeName: 'naColorgradientSchemeYellow',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					0: {
						background: 'goldenrod',
						color: '#200000'
					},
					40: {
						color: 'darkred'
					},
					100: {
						background: 'white',
						color: 'red'
					}
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientSchemeFullRange : {
			themeName: 'naColorgradientSchemeFullRange',
			cssGeneration : {
				colorLevels : {
					0 : {
						background : '#000',
						color : '#FFF'
					},
					33 : {
						background : '#F00',
						color : '#0FF'
					},
					66 : {
						background : '#0F0',
						color : '#00F'
					},
					100 : {
						background : '#00F',
						color : '#000'
					}
				}
			}
		},
		naColorgradientSchemeFullRange_forTrace : {
			themeName: 'naColorgradientSchemeFullRange_forTrace',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels : {
					0 : {
						background : '#000',
						color : '#FFF'
					},
					33 : {
						background : '#F00',
						color : '#0FF'
					},
					66 : {
						background : '#0F0',
						color : '#00F'
					},
					100 : {
						background : '#00F',
						color : '#000'
					}
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: true,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: false,
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientSchemeFullRangeWhiteBackground : {
			themeName: 'naColorgradientSchemeFullRange_forTrace',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels : {
					0 : {
						background : '#FFF',
						color : 'blue'
					},
					100 : {
						background : '#FFF',
						color : 'red'
					}
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: true,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: false,
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientSchemeBlue: {
			themeName: 'naColorgradientSchemeBlue',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					0: {
						color : 'blue'
					},
					100: {
						color: 'white'
					}
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientSchemeBlue_bright: {
			themeName: 'naColorgradientSchemeBlue_bright',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					0: {
						background: '#7A95FF',
						color: '#F6FFF5'
					},
					40: {
						color: '#FFC926'
					},
					100: {
						background: 'white',
						color: '#5C0900'
					}
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			jQueryScrollTo: {
				duration: 900
			}
		},
		
		naColorgradientScheme_navy : {
			themeName: 'naColorgradientScheme_navy',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : 'yellow',
				colorLegendHREF : 'goldenrod',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					0: {
						//background: 'navy',
						color: 'white'
					},
					50 : {
						color : 'yellow'
					},
					100: {
						//background: '#045717',
						color: 'white',
					}
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientScheme_text_001 : {
			themeName: 'naColorgradientScheme_text_001',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					0: {
						background: '#7A95FF',
						color: '#0AF7B7'
					},
					100: {
						background: 'white',
						color: '#2EA1FF'
					}
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientScheme_text_002 : {
			themeName: 'naColorgradientScheme_text_002',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					0: {
						background: '#7A95FF',
						color: '#57FC4E'
					},
					100: {
						background: 'white',
						color: '#FDFFBA'
					}
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientScheme_text_003 : {
			themeName: 'naColorgradientScheme_text_003',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					0: {
						background: '#7A95FF',
						color: '#3DE9F2'
					},
					100: {
						background: 'white',
						color: '#EFE6FF'
					}
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientScheme_text_004 : {
			themeName: 'naColorgradientScheme_text_004',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					0: {
						background: '#7A95FF',
						color: '#4129CC'
					},
					100: {
						background: 'white',
						color: '#00FF62'
					}
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			jQueryScrollTo: {
				duration: 900
			}
		},
		naColorgradientScheme_text_005 : {
			themeName: 'naColorgradientScheme_text_005',
			cssGeneration: {
				colorTitle : 'yellow',
				colorLegend : '#00BBBB',
				colorLegendHREF : '#00EEEE',
				colorStatus : 'goldenrod',
				colorStatusHREF : 'yellow',
				colorLevels: {
					0: {
						background: '#7A95FF',
						color: 'red'
					},
					100: {
						background: 'white',
						color: 'white'
					}
				}
			},
			htmlTopLevelTableProps: ' cellspacing="5"',
			htmlSubLevelTableProps: ' cellspacing="5"',
			showFooter: true,
			showArrayKeyValueHeader: false,
			showArrayStats: true,
			showArrayPath: true,
			showArraySiblings: true,
			jQueryScrollTo: {
				duration: 900
			}
		}
        
	};

	naCG.generateList_basic = function (theme, totalDepth) {
		// Make a scale (var steps) with 1 entry for each 
		// display-sub-level needed for this theme.
		// Then fill that scale with the correct property-values at each step.
		//for (t in na.hms.options.current.activeThemes) {
		//  var theme = na.hms.options.current.activeThemes[t];
		var cg = theme.cssGeneration;
		if (!cg || !cg.colorLevels || !cg.colorLevels[0] || !cg.colorLevels[100]) {
		na.hms.error('Invalid theme ' + theme.themeName);
		};
		var cgl = cg.colorLevels;
		
		var steps = [];
    
        var props = naCG.generateCSS_findProps(cg);
		for (var i = 0; i < totalDepth; i++) {
			var x = Math.round((i * 100) / (totalDepth));
			
			var step = {};
			for (var prop in props) {
                
                if (prop == 'remove') continue;
                
                if (prop=='background' || prop=='color') {
                    var 
                    l = naCG.generateCSS_findNeighbour(prop, x, cg, 'target'),
                    above = naCG.generateCSS_findNeighbour(prop, x, cg, 'above'),
                    beneath = naCG.generateCSS_findNeighbour(prop, x, cg, 'beneath'),
                    relX = Math.round((beneath * 100) / x),
                    newColor = {
                        red: naCG.generateCSS_calculateColor(
                            x, 
                            naCG.generateCSS_extractColor(cgl[above][prop], 'red'),
                            naCG.generateCSS_extractColor(cgl[l][prop], 'red'),
                            naCG.generateCSS_extractColor(cgl[beneath][prop], 'red')
                        ),
                        green: naCG.generateCSS_calculateColor(
                            x, 
                            naCG.generateCSS_extractColor(cgl[above][prop], 'green'),
                            naCG.generateCSS_extractColor(cgl[l][prop], 'green'),
                            naCG.generateCSS_extractColor(cgl[beneath][prop], 'green')
                        ),
                        blue: naCG.generateCSS_calculateColor(
                            x, 
                            naCG.generateCSS_extractColor(cgl[above][prop], 'blue'),
                            naCG.generateCSS_extractColor(cgl[l][prop], 'blue'),
                            naCG.generateCSS_extractColor(cgl[beneath][prop], 'blue')
                        ),
                        opacity : naCG.generateCSS_calculateFloat (
                            x,
                            naCG.generateCSS_extractColor(cgl[above][prop], 'opacity'),
                            naCG.generateCSS_extractColor(cgl[l][prop], 'opacity'),
                            naCG.generateCSS_extractColor(cgl[beneath][prop], 'opacity')
                        )
                    };

					step[prop] = naCG.generateCSS_combineColor(newColor, 'rgba');
                } else if (prop=='opacity') {
                    var 
                    above = naCG.generateCSS_findNeighbour(prop, x, cg, 'above'),
                    l = naCG.generateCSS_findNeighbour(prop, x, cg, 'target'),
                    beneath = naCG.generateCSS_findNeighbour(prop, x, cg, 'beneath'),
                    relX = Math.round((beneath * 100) / x);
                    
                    step[prop] = naCG.generateCSS_calculateFloat (x, cgl[above][prop], cgl[l][prop], cgl[beneath][prop]);
                };
            }
            steps.push(step);
		};
		
		return steps;
	}

	naCG.generateCSS_for_jsonViewer = function (theme, val, hmID) {
		var css = '';
		if (!hmID) { hmID = val.hms.keyID; }
		if (!theme || !theme.cssGeneration) debugger;
		if (theme.cssGeneration.colorTitle) {
			css += '#' + hmID + '_table > tbody > tr > td > div > div.hmLegend1 > table { color : '+theme.cssGeneration.colorTitle+'; }\n';
		}
		if (theme.cssGeneration.colorLegend) {
			css += '#' + hmID + '_table > tbody > tr > td > div > div.hmLegend2 > table { color : '+theme.cssGeneration.colorLegend+'; }\n';
		}
		if (theme.cssGeneration.colorLegendHREF) {
			css += '#' + hmID + '_table > tbody > tr > td > div > div.hmLegend2 > table > tbody > tr > td > a { color : '+theme.cssGeneration.colorLegendHREF+'; }\n';
		}
		if (theme.cssGeneration.colorStatus) {
			css += '#' + hmID + '_table > tbody > tr > td.hmFooter > table { color : '+theme.cssGeneration.colorStatus+'; }\n';
		}
		if (theme.cssGeneration.colorStatusHREF) {
			css += '#' + hmID + '_table > tbody > tr > td.hmFooter > table > tbody > tr > td > a, #' + hmID + '_table > tbody > tr > td.hmFooter > table > tbody > tr > td > a { color : '+theme.cssGeneration.colorStatusHREF+'; }\n';
		}

		// Make a scale (var steps) with 1 entry for each 
		// display-sub-level needed for this theme.
		// Then fill that scale with the correct property-values at each step.
		//for (t in na.hms.options.current.activeThemes) {
		//  var theme = na.hms.options.current.activeThemes[t];
		var totalDepth = val.hms.depth + 1;
		var cg = theme.cssGeneration;
		if (!cg || !cg.colorLevels || !cg.colorLevels[0] || !cg.colorLevels[100]) {
		na.hms.error('Invalid theme ' + theme.themeName);
		};
		var cgl = cg.colorLevels;
		
		var steps = [];
		var props = naCG.generateCSS_findProps(cg);
		for (var i = 0; i < totalDepth; i++) {
			var x = Math.round((i * 100) / (totalDepth));
			
			var step = {};
			for (var prop in props) {
            /*
				var l = naCG.generateCSS_findNeighbour(prop, x, cg, 'target');
				var above = naCG.generateCSS_findNeighbour(prop, x, cg, 'above');
				var beneath = naCG.generateCSS_findNeighbour(prop, x, cg, 'beneath');
				var relX = Math.round((beneath * 100) / x);
				var newColor = {
					red: naCG.generateCSS_calculateColor(x, naCG.generateCSS_extractColor(cgl[above][prop], 'red'), naCG.generateCSS_extractColor(cgl[l][prop], 'red'), naCG.generateCSS_extractColor(cgl[beneath][prop], 'red')),
					green: naCG.generateCSS_calculateColor(x, naCG.generateCSS_extractColor(cgl[above][prop], 'green'), naCG.generateCSS_extractColor(cgl[l][prop], 'green'), naCG.generateCSS_extractColor(cgl[beneath][prop], 'green')),
					blue: naCG.generateCSS_calculateColor(x, naCG.generateCSS_extractColor(cgl[above][prop], 'blue'), naCG.generateCSS_extractColor(cgl[l][prop], 'blue'), naCG.generateCSS_extractColor(cgl[beneath][prop], 'blue'))
				};

				step[prop] = naCG.generateCSS_combineColor(newColor);
			}
			steps.push(step);
			*/
                if (prop=='background' || prop=='color') {
                    var 
                    l = naCG.generateCSS_findNeighbour(prop, x, cg, 'target'),
                    above = naCG.generateCSS_findNeighbour(prop, x, cg, 'above'),
                    beneath = naCG.generateCSS_findNeighbour(prop, x, cg, 'beneath'),
                    relX = Math.round((beneath * 100) / x),
                    newColor = {
                        red: naCG.generateCSS_calculateColor(
                            x, 
                            naCG.generateCSS_extractColor(cgl[above][prop], 'red'),
                            naCG.generateCSS_extractColor(cgl[l][prop], 'red'),
                            naCG.generateCSS_extractColor(cgl[beneath][prop], 'red')
                        ),
                        green: naCG.generateCSS_calculateColor(
                            x, 
                            naCG.generateCSS_extractColor(cgl[above][prop], 'green'),
                            naCG.generateCSS_extractColor(cgl[l][prop], 'green'),
                            naCG.generateCSS_extractColor(cgl[beneath][prop], 'green')
                        ),
                        blue: naCG.generateCSS_calculateColor(
                            x, 
                            naCG.generateCSS_extractColor(cgl[above][prop], 'blue'),
                            naCG.generateCSS_extractColor(cgl[l][prop], 'blue'),
                            naCG.generateCSS_extractColor(cgl[beneath][prop], 'blue')
                        ),
                        opacity : naCG.generateCSS_calculateFloat (
                            x,
                            naCG.generateCSS_extractColor(cgl[above][prop], 'opacity'),
                            naCG.generateCSS_extractColor(cgl[l][prop], 'opacity'),
                            naCG.generateCSS_extractColor(cgl[beneath][prop], 'opacity')
                        )
                    };

                    step[prop] = naCG.generateCSS_combineColor(newColor,'rgba');
                } else if (prop=='opacity') {
                    var 
                    above = naCG.generateCSS_findNeighbour(prop, x, cg, 'above'),
                    l = naCG.generateCSS_findNeighbour(prop, x, cg, 'target'),
                    beneath = naCG.generateCSS_findNeighbour(prop, x, cg, 'beneath'),
                    relX = Math.round((beneath * 100) / x);
                    
                    step[prop] = naCG.generateCSS_calculateFloat (x, cgl[above][prop], cgl[l][prop], cgl[beneath][prop]);
                }
                steps.push(step);
			};
            
		}

		for (j in steps) {
			var step = steps[j];
			for (ta in na.hms.globals.cssGeneration.add) {
				css += '#' + hmID + '_table';
				for (var i = 0; i < j; i++) {
					css += '>' + na.hms.globals.cssGeneration.level;
				}
				if (na.hms.globals.cssGeneration.add[ta]) css += '>' + na.hms.globals.cssGeneration.add[ta];
				css += ', \n';
			}	
			css = css.substr(0, css.length - 3);
			css += ' {\n';
			for (prop in step) {
				css += prop + ' : ' + step[prop] + '; \n';
			}
			css += '}\n\n';
		};
		return css;
	}

	naCG.generateCSS_findProps = function (cg) {
		var props = [];
		for (i in cg.colorLevels) {
			for (p in cg.colorLevels[i]) {
				props[p] = cg.colorLevels[0][p];
			}
		}
		return props;
	}

	naCG.generateCSS_findNeighbour = function (prop, x, cg, what) {
		switch (what) {
			case 'above':
				for (p in cg.colorLevels) {
					if (cg.colorLevels[p][prop]) {
						if (p > x) {
							break;
						} else {
							var last = p;
						}
					}
				}
				if (last) return last;
				break;
			case 'beneath':
				for (p in cg.colorLevels) {
					if (cg.colorLevels[p][prop]) {
						if (p > x) {
							var last = p;
							break;
						} else {
							var last = p;
						}
					}
				}
				if (last) return last;
				break;
			case 'target':
				var sd = 101;
				var r = null;
				for (p in cg.colorLevels) {
					if (cg.colorLevels[p][prop]) {
						var diff = Math.abs(p - x);
						if (diff < sd) {
							sd = diff;
							r = p;
						}
					}
				}
				return r;
				break;
		}
		return false;
	}

	naCG.generateCSS_extractColor = function (combinedColor, what) {
        if (combinedColor.substr(0, 3) === 'rgb') {
            if (combinedColor.substr(0, 4) === 'rgba') {
                var 
                c = combinedColor.replace('rgba(','').replace(')','').split(','),
                opacity = parseFloat(c[3]);
            } else {
                var 
                c = combinedColor.replace('rgb(','').replace(')','').split(','),
                opacity = 1;
            }
            switch (what) {
                case 'red' : return parseFloat(c[0]);
                case 'green' : return parseFloat(c[1]);
                case 'blue' : return parseFloat(c[2]);
                case 'opacity' : return opacity;
            }                
        } else {
            // combinedColor is hex value or color name as string
            if (combinedColor.substr(0, 1) != '#') {
                var c = naCG.getColorValue(combinedColor);
                if (!c) {
                    //na.m.log(1, 'naCG.generateCSS_extractColor(): Cannot translate color "' + combinedColor + '", using white.');
                    combinedColor = '#ffffff';
                } else {
                    combinedColor = c;
                }
            }
            
            switch (what) {
                case 'red': return ((naCG.hex2dec(combinedColor.substr(1, combinedColor.length - 1)) & naCG.hex2dec('ff0000')) >> 16);
                case 'green': return ((naCG.hex2dec(combinedColor.substr(1, combinedColor.length - 1)) & naCG.hex2dec('00ff00')) >> 8);
                case 'blue': return ((naCG.hex2dec(combinedColor.substr(1, combinedColor.length - 1)) & naCG.hex2dec('0000ff')));
                case 'opacity' : return 1;
            };
        }
	}

	naCG.getColorValue = function (x) {
		if (x.substr(0, 1) == '#') {} else {
			for (c in naCG.globals.colorList) {
				if (c.toLowerCase() == x.toLowerCase()) return naCG.globals.colorList[c];
			}
		}
		return false;
	}

	naCG.generateCSS_calculateColor = function (x, above, target, beneath) {
		//above, target & beneath here, are integers 0-255
		//returns the color also in int 0-255
		var r = ((above < beneath ? Math.round(above + ((above - beneath) * x) / 100) : Math.round(above - ((above - beneath) * x) / 100)));
		var r = Math.round(above - ((above - beneath) * x) / 100);
		return r;
	}

	naCG.generateCSS_calculateFloat = function (x, above, target, beneath) {
		//above, target & beneath here, are integers 0-255
		//returns the color also in int 0-255
		var r = ((above < beneath ? (above + ((above - beneath) * x) / 100) : (above - ((above - beneath) * x) / 100)));
		var r1 = (above - ((above - beneath) * x) / 100);
		return r1;
	},

	naCG.generateCSS_combineColor = function (ncd, how) {
		if (typeof ncd.red != 'number') na.hms.error('generateCSS_combineColor: invalid red ' + ncd.red);
		if (typeof ncd.green != 'number') na.hms.error('generateCSS_combineColor: invalid green ' + ncd.green);
		if (typeof ncd.blue != 'number') na.hms.error('generateCSS_combineColor: invalid blue ' + ncd.blue);
		
        if (!how) how = 'hex';
        
        switch (how) {
            case 'hex' : return '#' + naCG.dec2hex(ncd.red) + naCG.dec2hex(ncd.green) + naCG.dec2hex(ncd.blue);
            case 'rgba' : return 'rgba(' + ncd.red + ', ' + ncd.green + ', ' + ncd.blue + ', ' + Math.round((ncd.opacity + Number.EPSILON) * 1000) / 1000 + ')';
            case 'rgb' : return 'rgb(' + ncd.red + ', ' + ncd.green + ', ' + ncd.blue + ')';
        }
        
		return false;
	}
	
	



 /*	
		initializeColorShifting : function (cmdID) {
			var data = na.lah.cmds[cmdID].dataByContext;
			for (context in data) {
				var itemID = na.lah.cmd.context2itemID[context];
				var contextRec = na.lah.cmds[cmdID].dataByContext[context];
				
				var et = contextRec.errsHighestSeverity;
				var theme = na.lah.options.authorsDefaults.phpErrorType2ThemeChoices[et];
				na.lah.tools.applyBaseColors (cmdID, itemID+'_more', theme);
				na.lah.tools.startColorShifting (cmdID, itemID+'_more', theme);
				na.lah.tools.applyBaseColors (cmdID, itemID+'_title', theme);
				na.lah.tools.startColorShifting (cmdID, itemID+'_title', theme);
			}		
		},


		startColorShifting : function (cmdID, itemID, theme, animateImmediately) {
			var r = {
				stepNo : 0,
				stepIncreasing : true,
				animating : animateImmediately,
				colorSteps : na.lah.tools.calculateColorSteps(cmdID, itemID, theme)
			};
			na.lah.animationItems[itemID] = r;
			na.lah.cmds[cmdID].items[itemID] = r;
		},

	
		doColorShiftingNextStep : function (cmdID) {
			if (jQuery('#'+cmdID).css('display')=='none') return false;
			for (itemID in na.lah.animationItems) {
				var lahItem = na.lah.animationItems[itemID];
				if (lahItem.animating) {
					if (lahItem.stepIncreasing) {
						var stepNo = lahItem.stepNo++;
					} else {
						var stepNo = lahItem.stepNo--;
					}
					if (stepNo > na.lah.options.colorShiftingTotalSteps) {
						lahItem.stepIncreasing = false;
						lahItem.stepNo = na.lah.options.colorShiftingTotalSteps - 1;
					} else if (stepNo < 0) {
						lahItem.stepIncreasing = true;
						lahItem.stepNo = 0;
					}
					na.lah.tools.colorShiftingNextStep (cmdID, itemID, lahItem.stepNo);
				}
			};
			setTimeout (function () {
				na.lah.tools.doColorShiftingNextStep (cmdID);
			}, 50);
		},		

	
		colorShiftingNextStep : function (cmdID, itemID, stepNo) {
			//if (jQuery('#'+cmdID).css('display')=='none') return false;
			var lahItem = na.lah.animationItems[itemID];
			var steps = lahItem.colorSteps;
			var step = steps[stepNo];
			for (prop in step) {
				 var htmlIDtarget = '#' + itemID;
				 var translatedProp = '';
				 switch (prop) {
					case 'opacity':
						translatedProp = 'opacity';
						break;
					case 'colorEntryBackground':
						translatedProp = 'background';
						break;
					case 'colorEntryText':
						htmlIDtarget += ', '+htmlIDtarget+' .lahItemTitle table';
						translatedProp = 'color';
						break;
					case 'colorEntryHREF':
						htmlIDtarget += '  a';
						translatedProp = 'color';
						break;
				 };
				jQuery(htmlIDtarget).css (translatedProp, step[prop]);
			}
		
		},
 */

	naCG.is_float = function (mv) {
		// Returns true if variable is float point  
		
		// 
		
		// version: 911.718
		
		// discuss at: http://phpjs.org/functions/is_float    // +   original by: Paulo Ricardo F. Santos
		
		//   +   bugfixed by: Brett Zamir (http://brett-zamir.me)
		
		//   +   improved by: WebDevHobo (http://webdevhobo.blogspot.com/)
		
		//   %        note 1: 1.0 is simplified to 1 before it can be accessed by the function, this makes
		
		//    %        note 1: it different from the PHP implementation. We can't fix this unfortunately.      example 1: is_float(186.31);
		
		//    *     returns 1: true
		
		if (typeof mv !== 'number') {
			return false;
		}
		return !! (mv % 1);
	},

	//thanx http://javascript.about.com/library/blh2d.htm :
	naCG.dec2hex = function (d) {
		var r = Math.abs(d).toString(16);
		if (r.length == 1) r = '0' + r;
		return r;
	}

	naCG.hex2dec = function (h) {
		return parseInt(h, 16);
	}
