package Models.TransferModels;

public class TransferRequestModel {
    public int ActionType;
    public String TransferObject;


    @Override
    public String toString() {
        return "TransferModel{" +
                "ActionType=" + ActionType +
                ", TransferObject='" + TransferObject + '\'' +
                '}';
    }
}
