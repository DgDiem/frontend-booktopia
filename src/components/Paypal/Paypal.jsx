import {
    PayPalScriptProvider,
    PayPalButtons,
    usePayPalScriptReducer,
  } from "@paypal/react-paypal-js";
  import { useEffect, useState } from "react";
  import Swal from "sweetalert2";
  
  const style = { layout: "vertical" };
  
  const ButtonWrapper = ({ currency, showSpinner, amount,  onPaymentComplete, setPaymentStatus }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer();
    const [isPaid, setIsPaid] = useState(false);
    useEffect(() => {
      if (options.currency !== currency) {
        dispatch({
          type: "resetOptions",
          value: {
            ...options,
            currency: currency,
          },
        });
      }
    }, [currency, showSpinner, dispatch]);
  
    const usdAmount = (amount / 23000).toFixed(2);
 
   
  const handleSaveOrder = () => {
    Swal.fire({
      title: "Thanh toán thành công!",
      icon: "success",
      confirmButtonText: "Đóng",
    }).then(() => {
        setIsPaid(true); onPaymentComplete("Đã thanh toán");
    });
  };
  
    return (
      <>
        {showSpinner && isPending && <div className="spinner" />}
        <PayPalButtons
          style={style}
          fundingSource="paypal"
          disabled={false}
          forceReRender={[currency, usdAmount]} 
          createOrder={(data, actions) =>
            actions.order.create({
              purchase_units: [{ amount: { currency_code: "USD", value: usdAmount } }],
            })
          }
          onApprove={(data, actions) =>
            actions.order.capture().then((response) => {
              if (response.status === "COMPLETED") {
         
                handleSaveOrder();  // Cập nhật trạng thái khi thanh toán thành công
         
              }
            })
          }
          onError={(err) => {
            Swal.fire({
              title: "Lỗi thanh toán!",
              text: "Có lỗi xảy ra trong quá trình thanh toán. Vui lòng thử lại sau.",
              icon: "error",
            });
          }}
          onCancel={() => {
            Swal.fire({
              title: "Thanh toán bị hủy!",
              text: "Giao dịch của bạn đã bị hủy.",
              icon: "warning",
            });
          }}
        />
      </>
    );
  };
  
  export default function Paypal({ amount, payload, onPaymentComplete }) {
    const [paymentStatus, setPaymentStatus] = useState(false);
    const handlePaymentComplete = (status) => {
        console.log("Thanh toán hoàn tất với trạng thái:", status);
        setPaymentStatus(status); // Cập nhật trạng thái thanh toán
    
        // Nếu có hàm onPaymentComplete từ props, gọi nó
        if (onPaymentComplete) {
          onPaymentComplete(status); // Truyền trạng thái thanh toán lên cấp cha
        }
      };
    
      
  
    return (
      <div style={{ maxWidth: "750px", minHeight: "200px" }}>
        <PayPalScriptProvider
          options={{
            clientId: "Adtkrmc59hyNY57-ivISCVZrE497XF2Sv-fqvUP8ppMpzaOlOappNvCP3x5m888xv3N-P72m0_0d2Pb9",
            components: "buttons",
            currency: "USD",
          }}
        >
          <ButtonWrapper
            payload={payload}
            currency={"USD"}
            amount={amount}
            showSpinner={false}
        onPaymentComplete={handlePaymentComplete}
          />
        </PayPalScriptProvider>
        <div>{paymentStatus ? "Thanh toán thành công!" : "Chưa thanh toán"}</div>  {/* Hiển thị thông báo khi thanh toán thành công */}
      </div>
    );
  }
  