import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Page, Text, View, Document, StyleSheet, pdf } from '@react-pdf/renderer';


export default function Bill() {
    const [bills, setBills] = useState([]);

    const styles = StyleSheet.create({
        page: {
            padding: 30,
            fontSize: 12,
        },
        table: {
            display: 'table',
            width: 'auto',
            borderWidth: 1,
            borderColor: 'black',
            borderStyle: 'solid',
            marginTop: 10,
        },
        tableRow: {
            flexDirection: 'row',
        },
        tableColHeader: {
            width: '20%',
            borderStyle: 'solid',
            borderColor: 'black',
            borderBottomWidth: 1,
            backgroundColor: '#eee',
            padding: 5,
        },
        tableCol: {
            width: '20%',
            borderStyle: 'solid',
            borderColor: 'black',
            borderBottomWidth: 1,
            padding: 5,
        },
        tableCell: {
            fontSize: 10,
        },
    });

    const MyDocument = ({ data }) => (
        <Document>
            <Page size="A4" style={styles.page}>
                <Text>Billing Reports:</Text>
                <View style={styles.table}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableColHeader}><Text style={styles.tableCell}>PatientName</Text></View>
                        <View style={styles.tableColHeader}><Text style={styles.tableCell}>Amount</Text></View>
                        <View style={styles.tableColHeader}><Text style={styles.tableCell}></Text>Paymentstatus</View>

                    </View>
                    <view>
                        {data.map((item, idx) => <View style={styles.tableRow} key={idx}>

                            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.Patientname}</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.Amount}</Text></View>
                            <View style={styles.tableCol}><Text style={styles.tableCell}>{item.Paymentstatus}</Text></View>


                        </View>
                        )}
                    </view>
                </View>
            </Page>
        </Document>
    );

    const GeneratePDF = async (data) => {
        const blob = await pdf(<MyDocument data={data} />).toBlob();

        const link = document.createElement('a');
        link.href = URL.createObjectURL(blob);
        link.download = 'example.pdf';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                const [billsData] = await Promise.all([
                    axios.get('http://localhost:2000/bill_get')
                ]);

                const fetchedBills = billsData.data.map(bill => ({
                    ...bill,
                }));

                setBills(fetchedBills);
            } catch (error) {
                console.error("Error fetching billing data:", error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="text-center">
            <h2 className="mb-3">Billing Reports</h2>
            <div className="d-flex justify-content-end">
                <button className="btn btn-primary" onClick={() => { GeneratePDF(bills) }}>View PDF</button>
            </div>
            <table className="table table-bordered mx-auto" style={{ width: "80%" }}>
                <thead className="table-primary">
                    <tr>
                        <th>Patient Name</th>
                        <th>Amount</th>
                        <th>Payment Status</th>
                    </tr>
                </thead>
                <tbody className="table-active">
                    {bills.map(bill => (
                        <tr key={bill._id}>
                            <td>{bill.Patientname}</td>
                            <td>{bill.Amount}</td>
                            <td>{bill.Paymentstatus}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <Link to="/admindashbord">GO BACK</Link>
        </div>
    );
}
