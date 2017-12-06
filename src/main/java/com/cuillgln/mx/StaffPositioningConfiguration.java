package com.cuillgln.mx;

import javax.sql.DataSource;

import org.springframework.boot.autoconfigure.jdbc.DataSourceBuilder;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.boot.orm.jpa.EntityManagerFactoryBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;

import com.cuillgln.mx.entity.staffpositioning.StaffPositioningStation;
import com.cuillgln.mx.repository.staffpositioning.StaffPositioningStationRepository;

@EnableJpaRepositories(basePackageClasses = StaffPositioningStationRepository.class, entityManagerFactoryRef = "kj289EntityManagerFactory")
@Configuration
public class StaffPositioningConfiguration {

	@Bean
	@ConfigurationProperties("mx.datasource.kj289")
	public DataSource kj289DataSource() {
		return DataSourceBuilder.create().build();
	}

	@Bean
	public LocalContainerEntityManagerFactoryBean kj289EntityManagerFactory(EntityManagerFactoryBuilder builder) {
		return builder.dataSource(kj289DataSource()).packages(StaffPositioningStation.class)
				.persistenceUnit("kj289Unit").build();
	}

}
