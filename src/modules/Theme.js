const Themes = {
    Original : {
        color : {
        '--N_BC'    :   '#659169',      // Navigation BackgroundColor
        '--NI_C'    :   '#659169',      // NavigationIcon Color
        '--NI_BC'   :   '#FFFFFF',      // NavigationIcon BackgroundColor
        '--NIC_C'   :   '#FFFFFF',      // NavigationIconClick Color
        '--NIC_BC'  :   '#EC8282',      // NavigationIconClick BackgroundColor
        '--NIH_C'   :   '#FFFFFF',      // NavigationIconHover Color
        '--NIH_BC'  :   '#ECB582',      // NavigationIconHover BackgroundColor

        '--SB_C'    :   '#FFFFFF',      // SidebarButton Color
        '--SB_BC'   :   '#659169',      // SidebarButton BackgroundColor
        '--S_B_C'   :   '#659169',      // Sidebar Border Color
        '--S_BC'    :   '#EBF2FD',      // Sidebar BackgroundColor
        '--SH_C'    :   '#000000',      // SidebarHead Color
        '--SH_BC'   :   '#659169',      // SidebarHead BackgroundColor

        '--M_B_C'   :   '#659169',      // Map Border Color

        '--ER_BC'   :   '#F5F5F5',      // EventRow BackgroundColor
        '--ER_B_C'  :   '#D3D3D3',      // EventRow Border Color
        '--ERH_C'   :   '#DADADA',      // EventRowHover Color
        '--EN_C'    :   '#5555FF',      // EventName Color
        '--EC_C'    :   '#000000',      // EventContent Color
        '--ET_C'    :   '#000000',      // EventTime Color

        '--CBR_B_C' :   '#D3D3D3',      // ChatroomBoxRaw Border Color
        '--CBR_C'   :   '#000000',      // ChatroomBoxRaw Color
        '--CBR_BC'  :   '#F5F5F5',      // ChatroomBoxRaw BackgroundColor
        '--CBRH_BC' :   '#DADADA',      // ChatroomBoxRawHover BackgroundColor
        '--AN_BC'   :   '#d46161',      // ActivationNum BackgroundColor
        '--CBRM_C'  :   '#000000',      // ChatroomBoxRawMessage Color
        '--CBRT_C'  :   '#D3D3D3',      // ChatroomBoxRawTime Color

        '--C_TA_C'  :   '#000000',      // Chat TextArea Color
        '--C_TA_BC' :   '#F5F5F5',      // Chat TextArea BackgroundColor
        '--C_SB_C'  :   '#000000',      // Chat SendButton Color
        '--C_SB_BC' :   '#659169',      // Chat SendButton BackgroundColor
        '--C_SBH_C' :   '#000000',      // Chat SendButtonHover Color
        '--C_SBH_BC':   '#ECB582',      // Chat SendButtonHover BackgroundColor
        '--C_C_BC'  :   '#FFFFFF',      // Chat Chat BackgroundColor

        '--C_MT_C'  :   '#000000',      // Chat MyTime Color
        '--C_MM_C'  :   '#000000',      // Chat MyMsg Color
        '--C_MM_BC' :   '#C2F598',      // Chat MyMsg BackgroundColor
        
        '--C_PT_C'  :   '#000000',      // Chat PeerTime Color
        '--C_PN_C'  :   '#000000',      // Chat PeerName Color
        '--C_PM_C'  :   '#000000',      // Chat PeerMsg Color
        '--C_PM_BC' :   '#F0F0F0',      // Chat PeerMsg BackgroundColor
        },
        polygondesign:{
            color : ['#7ED4F0','#4040F0', '#F51D1A', '#10E040'],
            opacity : [0.3, 0.5, 0.3, 0.4],
            scolor : '#FFFFFF',
            sopacity : 1.0,
        }
    },
    Black : {
        color : {
        '--N_BC'    :   '#101010',      // Navigation BackgroundColor
        '--NI_C'    :   '#101010',      // NavigationIcon Color
        '--NI_BC'   :   '#F0F0F0',      // NavigationIcon BackgroundColor
        '--NIH_C'   :   '#505050',      // NavigationIconHover Color
        '--NIH_BC'  :   '#A0A0A0',      // NavigationIconHover BackgroundColor
        '--NIC_C'   :   '#F0F0F0',      // NavigationIconClick Color
        '--NIC_BC'  :   '#505050',      // NavigationIconClick BackgroundColor

        '--SB_C'    :   '#FFFFFF',      // SidebarButton Color
        '--SB_BC'   :   '#101010',      // SidebarButton BackgroundColor
        '--S_B_C'   :   '#101010',      // Sidebar Border Color
        '--S_BC'    :   '#707070',      // Sidebar BackgroundColor
        '--SH_C'    :   '#FFFFFF',      // SidebarHead Color
        '--SH_BC'   :   '#101010',      // SidebarHead BackgroundColor

        '--M_B_C'   :   '#101010',      // Map Border Color

        '--ER_BC'   :   '#707070',      // EventRow BackgroundColor
        '--ER_B_C'  :   '#DADADA',      // EventRow Border Color
        '--ERH_C'   :   '#909090',      // EventRowHover Color
        '--EN_C'    :   '#F0F0F0',      // EventName Color
        '--EC_C'    :   '#C0C0C0',      // EventContent Color
        '--ET_C'    :   '#C0C0C0',      // EventTime Color

        '--CBR_B_C' :   '#D3D3D3',      // ChatroomBoxRaw Border Color
        '--CBR_C'   :   '#F0F0F0',      // ChatroomBoxRaw Color
        '--CBR_BC'  :   '#707070',      // ChatroomBoxRaw BackgroundColor
        '--CBRH_BC' :   '#909090',      // ChatroomBoxRawHover BackgroundColor
        '--AN_BC'   :   '#d48080',      // ActivationNum BackgroundColor
        '--CBRM_C'  :   '#F0F0F0',      // ChatroomBoxRawMessage Color
        '--CBRT_C'  :   '#D0D0D0',      // ChatroomBoxRawTime Color

        '--C_TA_C'  :   '#F0F0F0',      // Chat TextArea Color
        '--C_TA_BC' :   '#909090',      // Chat TextArea BackgroundColor
        '--C_SB_C'  :   '#F0F0F0',      // Chat SendButton Color
        '--C_SB_BC' :   '#505050',      // Chat SendButton BackgroundColor
        '--C_SBH_C' :   '#F0F0F0',      // Chat SendButtonHover Color
        '--C_SBH_BC':   '#505050',      // Chat SendButtonHover BackgroundColor
        '--C_C_BC'  :   '#606060',      // Chat Chat BackgroundColor

        '--C_MT_C'  :   '#B0B0B0',      // Chat MyTime Color
        '--C_MM_C'  :   '#F0F0F0',      // Chat MyMsg Color
        '--C_MM_BC' :   '#A0A0A0',      // Chat MyMsg BackgroundColor
        
        '--C_PT_C'  :   '#B0B0B0',      // Chat PeerTime Color
        '--C_PN_C'  :   '#E0E0E0',      // Chat PeerName Color
        '--C_PM_C'  :   '#F0F0F0',      // Chat PeerMsg Color
        '--C_PM_BC' :   '#A0A0A0',      // Chat PeerMsg BackgroundColor
        },
        polygondesign:{
            color : ['#707070','#000000' ,'#606060', '#F0F0F0'],
            opacity : [0.3, 0.6, 0.4, 0.7],            
            scolor : '#000000',
            sopacity : 1.0,
        }
    }

}
export default Themes;