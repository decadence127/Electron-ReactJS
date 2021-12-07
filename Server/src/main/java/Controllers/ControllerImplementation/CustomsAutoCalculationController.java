package Controllers.ControllerImplementation;

import Controllers.BaseController.BaseRequestController;
import Models.RequestModels.CustomsCalcAutoRequestTransferModel;
import Models.ResponseModels.CustomsCalcAutoResponseTransferModel;
import Utils.ConstTypes;

import java.lang.reflect.Type;

public class CustomsAutoCalculationController extends BaseRequestController<CustomsCalcAutoRequestTransferModel, CustomsCalcAutoResponseTransferModel> {
    @Override
    public int GetHandlerCode() {
        return ConstTypes.ActionTypes.CALC_AUTO_ACTION;
    }

    @Override
    public Type getIncomingModelType() {
        return CustomsCalcAutoRequestTransferModel.class;
    }

    @Override
    protected CustomsCalcAutoResponseTransferModel Execute(CustomsCalcAutoRequestTransferModel customsCalcRequestTransferModel) throws Exception {
        float total_duty = 0;
        int calc_age = customsCalcRequestTransferModel.getCarAge();
        float calc_price = customsCalcRequestTransferModel.getCarCost();
        int calc_capacity = customsCalcRequestTransferModel.getEngineCapacity();
            if (calc_age < 3)
            {
                if (calc_price <= 8500)
                {
                    total_duty = (float) ((calc_price * 0.54 < calc_price * 2.5) ? (calc_capacity * 2.5) : (calc_price * 0.54));
                }
                else if (calc_price > 8500 && calc_price <= 16700)
                {
                    total_duty = (float) ((calc_price * 0.48 < calc_capacity * 3.5) ? (calc_capacity * 3.5) : (calc_price * 0.48));
                }
                else if (calc_price > 16700 && calc_price <= 42300)
                {
                    total_duty = (float) ((calc_price * 0.48 < calc_capacity * 5.5) ? (calc_capacity * 5.5) : (calc_price * 0.48));
                }
                else if (calc_price > 42300 && calc_price <= 84500)
                {
                    total_duty = (float) ((calc_price * 0.48 < calc_capacity * 7.5) ? (calc_capacity * 7.5) : (calc_price * 0.48));
                }
                else if (calc_price > 84500 && calc_price <= 169000)
                {
                    total_duty = (calc_price * 0.48 < calc_capacity * 15) ? (calc_capacity * 15) : (float) (calc_price * 0.48);
                }
                else if (calc_price > 169000)
                {
                    total_duty = (calc_price * 0.48 < calc_capacity * 20) ? (calc_capacity * 20) : (float) (calc_price * 0.48);
                }
            }
            else if (calc_age >= 3 && calc_age <= 5)
            {
                if (calc_capacity <= 1000) { total_duty = (float) (calc_capacity * 1.5); }
                else if (calc_capacity > 1000 && calc_capacity <= 1500) { total_duty = (float) (calc_capacity * 1.7); }
                else if (calc_capacity > 1500 && calc_capacity <= 1800) { total_duty = (float) (calc_capacity * 2.5); }
                else if (calc_capacity > 1800 && calc_capacity <= 2300) { total_duty = (float) (calc_capacity * 2.7); }
                else if (calc_capacity > 2300 && calc_capacity <= 3000) { total_duty = calc_capacity * 3; }
                else if (calc_capacity > 3000) { total_duty = (float) (calc_capacity * 3.6); }
            }
            else if (calc_age > 5)
            {
                if (calc_capacity <= 1000) { total_duty = calc_capacity * 3; }
                else if (calc_capacity > 1000 && calc_capacity <= 1500) { total_duty = (float) (calc_capacity * 3.2); }
                else if (calc_capacity > 1500 && calc_capacity <= 1800) { total_duty = (float) (calc_capacity * 3.5); }
                else if (calc_capacity > 1800 && calc_capacity <= 2300) { total_duty = (float) (calc_capacity * 4.8); }
                else if (calc_capacity > 2300 && calc_capacity <= 3000) { total_duty = calc_capacity * 5; }
                else if (calc_capacity > 3000) { total_duty = (float) (calc_capacity * 5.7); }
            }



        CustomsCalcAutoResponseTransferModel model = new CustomsCalcAutoResponseTransferModel();
        model.setTaxValue(total_duty);

        return model;
    }
}
