declare const useStyles: (y: number) => {
    keyboardAvoidingView: {
        position: "absolute";
        alignSelf: "center";
        top: number;
        width: string;
    };
    listContainer: {
        width: string;
        height: number;
        backgroundColor: string;
        padding: number;
        borderRadius: number;
        justifyContent: "center";
        marginTop: number;
        shadowColor: string;
        shadowOpacity: number;
        shadowRadius: number;
        shadowOffset: {
            height: number;
            width: number;
        };
        elevation?: undefined;
        overflow?: undefined;
    } | {
        width: string;
        height: number;
        backgroundColor: string;
        padding: number;
        borderRadius: number;
        justifyContent: "center";
        marginTop: number;
        elevation: number;
        overflow: "hidden";
        shadowColor?: undefined;
        shadowOpacity?: undefined;
        shadowRadius?: undefined;
        shadowOffset?: undefined;
    };
    dismissButton: {
        flex: number;
        width: string;
    };
    modalChild: {
        flex: number;
    };
};
export default useStyles;
