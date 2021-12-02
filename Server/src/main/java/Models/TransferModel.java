package Models;

public class TransferModel {
    public int ActionType;
    public Object TransferObject;
    public TransferModel(){};
    public TransferModel(int actionType, Object transferObject) {
        ActionType = actionType;
        TransferObject = transferObject;
    }

    @Override
    public String toString() {
        return "TransferModel{" +
                "ActionType=" + ActionType +
                ", TransferObject='" + TransferObject + '\'' +
                '}';
    }
}
