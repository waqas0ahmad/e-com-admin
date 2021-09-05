import React, { Fragment, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Breadcrumb from "../common/breadcrumb";
import { Card, CardBody, CardHeader, Container } from "reactstrap";
import axios from "axios";
import { config } from "../../constants/config";
import { Types } from "../../constants/types";

const List_user = () => {
	const [users,setUserList] = useState([]);
	useEffect(()=>{getList()},[])
	const getList = ()=>{
		axios.get(config.apiUrl+"account",{headers:{
			Authorization:JSON.parse(localStorage.getItem("user")).Token
		}}).then(x=>{
			if(x.data.Status == 200){
				setUserList(x.data.Data);
			}

		})
	}
	const onDeleteClick = (e) => {
		axios.delete(config.apiUrl+"account/"+e+"/delete",{headers:{
			Authorization:JSON.parse(localStorage.getItem("user")).Token
		}}).then(x=>{
			alert(x.data.Message);
			if(x.data.Status == 200){
				
			}

		})
	}
	return (
		<Fragment>
			<Breadcrumb title="User List" parent="Users" />
			<Container fluid={true}>
				<Card>
					<CardHeader>
						<h5>User Details</h5>
					</CardHeader>
					<CardBody>
						<div className="btn-popup pull-right">
							<Link to="/users/create-user" className="btn btn-secondary">
								Create User
							</Link>
						</div>
						<div className="clearfix"></div>
						<div
							id="batchDelete"
							className="category-table user-list order-table coupon-list-delete"
						>
							<table className="table table-hover table-striped">
								<thead>
								<tr>
									<th>
										No
									</th>
									<th>
										Profile
									</th>
									<th>
										Full name
									</th>
									<th>
										Display name
									</th>
									<th>
										Email
									</th>
									<th>
										Type
									</th>
									<th>
										Username
									</th>
									<th>
										action
									</th>
								</tr>
								</thead>
								<tbody>
								{
									users.map((x,i)=>{
										return<tr>

											<td>
												{i+1}
											</td>
											<td>
												{x.Profile?<img src={config.url+x.Profile} className="img-50 img-thumbnail"/>:""}
											</td>
											<td>
												{x.FirstName} {x.LastName}
											</td>
											<td>
												{x.DisplayName}
											</td>
											<td>
												{x.Email}
											</td>
											<td>{Types[x.Type]}</td>
											<td>{x.Username}</td>
											<td>
												Edit  |  
												<span onClick = {()=>{onDeleteClick(x.Id)}}>
												delete
												</span>
											</td>
										</tr>
									})
								}
								</tbody>
							</table>
							{/* <Datatable
								multiSelectOption={true}
								myData={users}
								pageSize={10}
								pagination={true}
								class="-striped -highlight"
							/> */}
						</div>
					</CardBody>
				</Card>
			</Container>
		</Fragment>
	);
};

export default List_user;
