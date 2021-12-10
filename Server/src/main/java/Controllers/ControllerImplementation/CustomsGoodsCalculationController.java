package Controllers.ControllerImplementation;

import Controllers.BaseController.BaseRequestController;
import Models.RequestModels.CustomsCalcGoodsRequestTransferModel;
import Models.ResponseModels.CustomsCalcGoodsResponseTransferModel;
import Utils.ConstTypes;

import java.lang.reflect.Type;

public class CustomsGoodsCalculationController extends BaseRequestController<CustomsCalcGoodsRequestTransferModel, CustomsCalcGoodsResponseTransferModel> {
    @Override
    public int GetHandlerCode() {
        return ConstTypes.ActionTypes.CALC_GOODS_ACTION;
    }

    @Override
    public Type getIncomingModelType() {
        return CustomsCalcGoodsRequestTransferModel.class;
    }

    @Override
    protected CustomsCalcGoodsResponseTransferModel Execute(CustomsCalcGoodsRequestTransferModel customsCalcGoodsRequestTransferModel) throws Exception {
        float fixed_fee = 5;
        float calc_cost = customsCalcGoodsRequestTransferModel.getUnitCost();
        float calc_weight = customsCalcGoodsRequestTransferModel.getUnitWeight();
        float goodsTaxValue = (float) ((calc_cost > 22 && calc_weight <= 10) ? (calc_cost + (calc_cost * 0.15) + fixed_fee) : (calc_cost <= 22 && calc_weight > 10) ? calc_cost + ((calc_weight - 10) * 2 + fixed_fee) : (calc_cost > 22 && calc_weight > 10) ? (calc_weight - 10 * 2) > (calc_cost * 0.15) ? calc_cost + ((calc_weight - 10) * 2) + fixed_fee : (calc_cost + (calc_cost * 0.15)) + fixed_fee : calc_cost);

        CustomsCalcGoodsResponseTransferModel model = new CustomsCalcGoodsResponseTransferModel();
        model.setTaxValue(goodsTaxValue - customsCalcGoodsRequestTransferModel.getUnitCost());
        return model;
    }
}
