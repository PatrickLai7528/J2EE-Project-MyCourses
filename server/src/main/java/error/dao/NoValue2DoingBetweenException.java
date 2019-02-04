package error.dao;/*
 * @PackageName error.dao
 * @ClassName NoValue2DoingBetween
 * @Author Lai Kin Meng
 * @Date 2019-02-03
 * @ProjectName server
 */

public class NoValue2DoingBetweenException extends Exception {
    public NoValue2DoingBetweenException(String msg) {
        super(msg);
    }

    public NoValue2DoingBetweenException() {
        super();
    }
}
