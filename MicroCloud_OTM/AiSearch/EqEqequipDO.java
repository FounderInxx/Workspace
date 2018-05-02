package com.bonc.equip.domain;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;



/**
 * 
 * 
 * @author liyangyang
 * @email liyangyang1@bonc.com.cn
 * @date 2018-03-14 17:01:02
 */
public class EqEqequipDO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	//主键
	private Integer id;
	//机构编码
	private String orgCode;
	//设备编码
	private String eqCode;
	//设备名称
	private String eqName;
	//设备分类
	private String eqType;
	//分类对应的名称
	private String eqTypeName;
	//设备状态
	private String eqState;
	//购置日期
	private String purchaseDate;
	//设备原值
	private BigDecimal price;
	//供应商
	private String supplyFac;
	//生产厂家
	private String manufacturer;
	//出厂日期
	private String releaseDate;
	//出厂编号
	private String facNumber;
	//数量
	private Double eqNum;
	//计量单位
	private String unit;
	//产品编号
	private String numOfProduct;
	//开始使用日期
	private String startDate;
	//使用部门
	private String useDept;
	//使用部门名称
	private String useDeptName;
	//使用地点
	private String useAddress;
	//使用状况
	private String useState;
	//责任人
	private String dutyUser;
	//完好状态
	private String healthState;
	//累计运行时间
	private String runTime;
	//累计停运时间
	private String outageTime;
	//累计停运次数
	private Integer outageNumber;
	//规格
	private String eqSpec;
	//型号
	private String model;
	//主要参数
	private String mainParams;
	//传感器类型
	private String sensorType;
	//检测设备编码
	private String monitorEqCode;
	//检测设备名称
	private String monitorEqName;
	//是否有测点
	private String isMeasurePoint;
	//资产编号
	private String assetNum;
	//
	private String isSensor;
	//创建人
	private String createUser;
	//创建时间
	private String createTime;
	//修改人
	private String modifyUser;
	//修改时间
	private String modifyTime;
	//审核人
	private String audUser;
	//设备编辑状态
	private String audFlag;
	//审核时间
	private String audTime;
	// 安装位置
	private String installLocation;
	//创建状态
	private String createState;
	//是否启用
	private String isUse;
	//模糊查询条件
	private String likeStr;
	private List<Ncr> ncr;
	
	public List<Ncr> getNcr() {
		return ncr;
	}
	public void setNcr(List<Ncr> ncr) {
		this.ncr = ncr;
	}
	/**
	 * 设置：主键
	 */
	public void setId(Integer id) {
		this.id = id;
	}
	/**
	 * 获取：主键
	 */
	public Integer getId() {
		return id;
	}
	/**
	 * 设置：机构编码
	 */
	public void setOrgCode(String orgCode) {
		this.orgCode = orgCode;
	}
	/**
	 * 获取：机构编码
	 */
	public String getOrgCode() {
		return orgCode;
	}
	/**
	 * 设置：设备编码
	 */
	public void setEqCode(String eqCode) {
		this.eqCode = eqCode;
	}
	/**
	 * 获取：设备编码
	 */
	public String getEqCode() {
		return eqCode;
	}
	/**
	 * 设置：设备名称
	 */
	public void setEqName(String eqName) {
		this.eqName = eqName;
	}
	/**
	 * 获取：设备名称
	 */
	public String getEqName() {
		return eqName;
	}
	/**
	 * 设置：设备分类
	 */
	public void setEqType(String eqType) {
		this.eqType = eqType;
	}
	/**
	 * 获取：设备分类
	 */
	public String getEqType() {
		return eqType;
	}
	/**
	 * 设置：设备状态
	 */
	public void setEqState(String eqState) {
		this.eqState = eqState;
	}
	/**
	 * 获取：设备状态
	 */
	public String getEqState() {
		return eqState;
	}
	/**
	 * 设置：购置日期
	 */
	public void setPurchaseDate(String purchaseDate) {
		this.purchaseDate = purchaseDate;
	}
	/**
	 * 获取：购置日期
	 */
	public String getPurchaseDate() {
		return purchaseDate;
	}
	/**
	 * 设置：设备原值
	 */
	public void setPrice(BigDecimal price) {
		this.price = price;
	}
	/**
	 * 获取：设备原值
	 */
	public BigDecimal getPrice() {
		return price;
	}
	/**
	 * 设置：供应商
	 */
	public void setSupplyFac(String supplyFac) {
		this.supplyFac = supplyFac;
	}
	/**
	 * 获取：供应商
	 */
	public String getSupplyFac() {
		return supplyFac;
	}
	/**
	 * 设置：生产厂家
	 */
	public void setManufacturer(String manufacturer) {
		this.manufacturer = manufacturer;
	}
	/**
	 * 获取：生产厂家
	 */
	public String getManufacturer() {
		return manufacturer;
	}
	/**
	 * 设置：出厂日期
	 */
	public void setReleaseDate(String releaseDate) {
		this.releaseDate = releaseDate;
	}
	/**
	 * 获取：出厂日期
	 */
	public String getReleaseDate() {
		return releaseDate;
	}
	/**
	 * 设置：出厂编号
	 */
	public void setFacNumber(String facNumber) {
		this.facNumber = facNumber;
	}
	/**
	 * 获取：出厂编号
	 */
	public String getFacNumber() {
		return facNumber;
	}
	/**
	 * 设置：数量
	 */
	public void setEqNum(Double eqNum) {
		this.eqNum = eqNum;
	}
	/**
	 * 获取：数量
	 */
	public Double getEqNum() {
		return eqNum;
	}
	/**
	 * 设置：计量单位
	 */
	public void setUnit(String unit) {
		this.unit = unit;
	}
	/**
	 * 获取：计量单位
	 */
	public String getUnit() {
		return unit;
	}
	/**
	 * 设置：产品编号
	 */
	public void setNumOfProduct(String numOfProduct) {
		this.numOfProduct = numOfProduct;
	}
	/**
	 * 获取：产品编号
	 */
	public String getNumOfProduct() {
		return numOfProduct;
	}
	/**
	 * 设置：开始使用日期
	 */
	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}
	/**
	 * 获取：开始使用日期
	 */
	public String getStartDate() {
		return startDate;
	}
	/**
	 * 设置：使用部门
	 */
	public void setUseDept(String useDept) {
		this.useDept = useDept;
	}
	/**
	 * 获取：使用部门
	 */
	public String getUseDept() {
		return useDept;
	}
	/**
	 * 设置：使用地点
	 */
	public void setUseAddress(String useAddress) {
		this.useAddress = useAddress;
	}
	/**
	 * 获取：使用地点
	 */
	public String getUseAddress() {
		return useAddress;
	}
	/**
	 * 设置：使用状况
	 */
	public void setUseState(String useState) {
		this.useState = useState;
	}
	/**
	 * 获取：使用状况
	 */
	public String getUseState() {
		return useState;
	}
	/**
	 * 设置：责任人
	 */
	public void setDutyUser(String dutyUser) {
		this.dutyUser = dutyUser;
	}
	/**
	 * 获取：责任人
	 */
	public String getDutyUser() {
		return dutyUser;
	}
	/**
	 * 设置：完好状态
	 */
	public void setHealthState(String healthState) {
		this.healthState = healthState;
	}
	/**
	 * 获取：完好状态
	 */
	public String getHealthState() {
		return healthState;
	}
	/**
	 * 设置：累计运行时间
	 */
	public void setRunTime(String runTime) {
		this.runTime = runTime;
	}
	/**
	 * 获取：累计运行时间
	 */
	public String getRunTime() {
		return runTime;
	}
	/**
	 * 设置：累计停运时间
	 */
	public void setOutageTime(String outageTime) {
		this.outageTime = outageTime;
	}
	/**
	 * 获取：累计停运时间
	 */
	public String getOutageTime() {
		return outageTime;
	}
	/**
	 * 设置：累计停运次数
	 */
	public void setOutageNumber(Integer outageNumber) {
		this.outageNumber = outageNumber;
	}
	/**
	 * 获取：累计停运次数
	 */
	public Integer getOutageNumber() {
		return outageNumber;
	}
	/**
	 * 设置：规格
	 */
	public void setEqSpec(String eqSpec) {
		this.eqSpec = eqSpec;
	}
	/**
	 * 获取：规格
	 */
	public String getEqSpec() {
		return eqSpec;
	}
	/**
	 * 设置：型号
	 */
	public void setModel(String model) {
		this.model = model;
	}
	/**
	 * 获取：型号
	 */
	public String getModel() {
		return model;
	}
	/**
	 * 设置：主要参数
	 */
	public void setMainParams(String mainParams) {
		this.mainParams = mainParams;
	}
	/**
	 * 获取：主要参数
	 */
	public String getMainParams() {
		return mainParams;
	}
	/**
	 * 设置：传感器类型
	 */
	public void setSensorType(String sensorType) {
		this.sensorType = sensorType;
	}
	/**
	 * 获取：传感器类型
	 */
	public String getSensorType() {
		return sensorType;
	}
	/**
	 * 设置：检测设备编码
	 */
	public void setMonitorEqCode(String monitorEqCode) {
		this.monitorEqCode = monitorEqCode;
	}
	/**
	 * 获取：检测设备编码
	 */
	public String getMonitorEqCode() {
		return monitorEqCode;
	}
	/**
	 * 设置：检测设备名称
	 */
	public void setMonitorEqName(String monitorEqName) {
		this.monitorEqName = monitorEqName;
	}
	/**
	 * 获取：检测设备名称
	 */
	public String getMonitorEqName() {
		return monitorEqName;
	}
	/**
	 * 设置：是否有测点
	 */
	public void setIsMeasurePoint(String isMeasurePoint) {
		this.isMeasurePoint = isMeasurePoint;
	}
	/**
	 * 获取：是否有测点
	 */
	public String getIsMeasurePoint() {
		return isMeasurePoint;
	}
	/**
	 * 设置：资产编号
	 */
	public void setAssetNum(String assetNum) {
		this.assetNum = assetNum;
	}
	/**
	 * 获取：资产编号
	 */
	public String getAssetNum() {
		return assetNum;
	}
	/**
	 * 设置：
	 */
	public void setIsSensor(String isSensor) {
		this.isSensor = isSensor;
	}
	/**
	 * 获取：
	 */
	public String getIsSensor() {
		return isSensor;
	}
	/**
	 * 设置：创建人
	 */
	public void setCreateUser(String createUser) {
		this.createUser = createUser;
	}
	/**
	 * 获取：创建人
	 */
	public String getCreateUser() {
		return createUser;
	}
	/**
	 * 设置：创建时间
	 */
	public void setCreateTime(String createTime) {
		this.createTime = createTime;
	}
	/**
	 * 获取：创建时间
	 */
	public String getCreateTime() {
		return createTime;
	}
	/**
	 * 设置：修改人
	 */
	public void setModifyUser(String modifyUser) {
		this.modifyUser = modifyUser;
	}
	/**
	 * 获取：修改人
	 */
	public String getModifyUser() {
		return modifyUser;
	}
	/**
	 * 设置：修改时间
	 */
	public void setModifyTime(String modifyTime) {
		this.modifyTime = modifyTime;
	}
	/**
	 * 获取：修改时间
	 */
	public String getModifyTime() {
		return modifyTime;
	}
	/**
	 * 设置：审核人
	 */
	public void setAudUser(String audUser) {
		this.audUser = audUser;
	}
	/**
	 * 获取：审核人
	 */
	public String getAudUser() {
		return audUser;
	}
	/**
	 * 设置：审核状态
	 */
	public void setAudFlag(String audFlag) {
		this.audFlag = audFlag;
	}
	/**
	 * 获取：审核状态
	 */
	public String getAudFlag() {
		return audFlag;
	}
	/**
	 * 设置：审核时间
	 */
	public void setAudTime(String audTime) {
		this.audTime = audTime;
	}
	/**
	 * 获取：审核时间
	 */
	public String getAudTime() {
		return audTime;
	}
	/**
	 * 获取：组合查询条件
	 */
	public String getLikeStr() {
		return likeStr;
	}
	
	
	public String getInstallLocation() {
		return installLocation;
	}
	public void setInstallLocation(String installLocation) {
		this.installLocation = installLocation;
	}
	
	
	
	
	public String getIsUse() {
		return isUse;
	}
	public void setIsUse(String isUse) {
		this.isUse = isUse;
	}
	public String getCreateState() {
		return createState;
	}
	public void setCreateState(String createState) {
		this.createState = createState;
	}
	/**
	 * 设置：组合查询条件
	 */
	public void setLikeStr(String likeStr) {
		this.likeStr = likeStr;
	}
	public String getEqTypeName() {
		return eqTypeName;
	}
	public void setEqTypeName(String eqTypeName) {
		this.eqTypeName = eqTypeName;
	}
	public String getUseDeptName() {
		return useDeptName;
	}
	public void setUseDeptName(String useDeptName) {
		this.useDeptName = useDeptName;
	}
}